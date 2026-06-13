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
