import { githubActivity } from "@/content/portfolio";
import { fetchGitHubContributions } from "@/lib/github";
import type { LivePortfolioSignals } from "@/lib/portfolio-contracts";

function normalizeContributionLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function getStaticPortfolioSignals(): LivePortfolioSignals {
  return {
    refreshedAt: "Static snapshot",
    contributionTotal: 1180,
    activeWeeks: 42,
    focusRepos: 7,
    weeks: githubActivity.weeks,
  };
}

export async function getPortfolioSignals({
  username,
  token,
}: {
  username: string;
  token?: string;
}): Promise<LivePortfolioSignals> {
  if (!token) return getStaticPortfolioSignals();

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
      focusRepos: 7,
      weeks,
    };
  } catch {
    return getStaticPortfolioSignals();
  }
}
