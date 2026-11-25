export type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
  /** GitHub's own 0–4 shade for the day (quartiles over the whole year). */
  level?: number;
};

const LEVEL_BY_NAME: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

const CONTRIBUTIONS_QUERY = `
  query Contributions($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubContributions({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { userName: username },
    }),
    next: { revalidate: 60 * 60 * 12 },
  });

  // 401 here almost always means the GH_PAT secret expired; say so in the
  // build log instead of a generic failure.
  if (!response.ok) {
    throw new Error(`GitHub GraphQL ${response.status} ${response.statusText}`);
  }

  const body = (await response.json()) as {
    errors?: { message: string }[];
    data?: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: { contributionDays: (GitHubContributionDay & { contributionLevel?: string })[] }[];
          };
        };
      } | null;
    };
  };
  const calendar = body.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) {
    throw new Error(`GitHub GraphQL returned no calendar: ${body.errors?.map((e) => e.message).join("; ") ?? "unknown"}`);
  }

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map(({ contributionLevel, ...day }) => ({
        ...day,
        level: contributionLevel ? LEVEL_BY_NAME[contributionLevel] : undefined,
      })),
    })),
  } satisfies ContributionCalendar;
}

export type ContributionCalendar = { weeks: GitHubContributionWeek[]; total: number };

/**
 * Parses GitHub's public contributions fragment
 * (https://github.com/users/<name>/contributions). Needs no token, so the
 * calendar still renders when the GraphQL token is missing or lacks scope.
 * Cells carry `id="contribution-day-component-<weekday>-<week>"` and a
 * `data-date`; per-day counts live in the matching `<tool-tip for=…>`.
 */
export function parseContributionsHtml(html: string): ContributionCalendar | null {
  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const match = text.match(/^([\d,]+) contributions?/);
    counts.set(id, match ? Number(match[1].replace(/,/g, "")) : 0);
  }

  const columns = new Map<number, GitHubContributionDay[]>();
  for (const [cell] of html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const id = cell.match(/\bid="(contribution-day-component-(\d+)-(\d+))"/);
    const date = cell.match(/\bdata-date="([^"]+)"/);
    const shade = cell.match(/\bdata-level="(\d)"/);
    if (!id || !date) continue;
    const column = Number(id[3]);
    const days = columns.get(column) ?? [];
    days.push({
      date: date[1],
      contributionCount: counts.get(id[1]) ?? 0,
      color: "",
      level: shade ? Number(shade[1]) : undefined,
    });
    columns.set(column, days);
  }
  if (columns.size === 0) return null;

  const weeks = [...columns.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, days]) => ({ contributionDays: days.sort((a, b) => a.date.localeCompare(b.date)) }));

  const heading = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const total = heading
    ? Number(heading[1].replace(/,/g, ""))
    : weeks.reduce((sum, week) => sum + week.contributionDays.reduce((s, d) => s + d.contributionCount, 0), 0);

  return { weeks, total };
}

export async function fetchPublicContributions(username: string): Promise<ContributionCalendar | null> {
  const response = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
    headers: { Accept: "text/html" },
  });
  if (!response.ok) throw new Error(`GitHub contributions page ${response.status}`);
  return parseContributionsHtml(await response.text());
}
