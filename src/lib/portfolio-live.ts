import { fetchGitHubContributions } from "@/lib/github";
import type { LivePortfolioSignals } from "@/lib/portfolio-contracts";

function normalizeContributionLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const EMPTY_WEEKS: number[][] = Array.from({ length: 53 }, () =>
  Array.from({ length: 7 }, () => 0),
);

async function fetchPublicRepoCount(username: string): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) return 0;
    const data = (await res.json()) as { public_repos?: number };
    return data.public_repos ?? 0;
  } catch {
    return 0;
  }
}

export function getStaticPortfolioSignals(): LivePortfolioSignals {
  return {
    refreshedAt: "No data available",
    contributionTotal: 0,
    activeWeeks: 0,
    focusRepos: 0,
    weeks: EMPTY_WEEKS,
  };
}

async function fetchPublicContributions(
  username: string,
): Promise<LivePortfolioSignals> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  );
  if (!res.ok) throw new Error("Public contributions API failed");

  const data = (await res.json()) as {
    total: Record<string, number>;
    contributions: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>;
  };

  // Chunk flat daily array into 7-day weeks
  const weeks: number[][] = [];
  const contribs = data.contributions;
  for (let i = 0; i < contribs.length; i += 7) {
    weeks.push(contribs.slice(i, i + 7).map((d) => d.level));
  }

  const total = Object.values(data.total).reduce((a, b) => a + b, 0);
  const activeWeeks = weeks.filter((w) => w.some((l) => l > 0)).length;

  return {
    refreshedAt: new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(new Date()),
    contributionTotal: total,
    activeWeeks,
    focusRepos: await fetchPublicRepoCount(username),
    weeks,
  };
}

export async function getPortfolioSignals({
  username,
  token,
}: {
  username: string;
  token?: string;
}): Promise<LivePortfolioSignals> {
  // Try authenticated GraphQL first (richer data, cached 12h)
  if (token) {
    try {
      const response = await fetchGitHubContributions({ username, token });
      const calendar =
        response.data.user.contributionsCollection.contributionCalendar;
      const weeks = calendar.weeks.map((week) =>
        week.contributionDays.map((day) =>
          normalizeContributionLevel(day.contributionCount),
        ),
      );
      return {
        refreshedAt: new Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
        contributionTotal: calendar.totalContributions,
        activeWeeks: weeks.filter((week) => week.some((level) => level > 0))
          .length,
        focusRepos: await fetchPublicRepoCount(username),
        weeks,
      };
    } catch {
      // fall through to public API
    }
  }

  // Fallback: public API — no token required
  try {
    return await fetchPublicContributions(username);
  } catch {
    return getStaticPortfolioSignals();
  }
}
