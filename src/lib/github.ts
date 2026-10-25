export type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
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

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  return response.json() as Promise<{
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: GitHubContributionWeek[];
          };
        };
      };
    };
  }>;
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
    if (!id || !date) continue;
    const column = Number(id[3]);
    const days = columns.get(column) ?? [];
    days.push({ date: date[1], contributionCount: counts.get(id[1]) ?? 0, color: "" });
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
