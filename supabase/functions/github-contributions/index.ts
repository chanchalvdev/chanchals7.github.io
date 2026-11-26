// Supabase Edge Function: github-contributions
//
// Serves the homepage GitHub calendar live. The portfolio is a static export,
// so the build-time snapshot goes stale between deploys; the tile calls this
// on page load instead. GitHub's GraphQL API needs a token, which must never
// reach the browser, so it lives here as a secret.
//
// Deploy:
//   supabase functions deploy github-contributions
// Secrets (Dashboard → Edge Functions → Secrets, or `supabase secrets set`):
//   GH_CONTRIB_TOKEN — classic PAT of the profile owner with `read:user`
//                      (owner's token so private contributions are counted)
//   GH_USER          — optional, defaults to "chanchalvdev"
//
// Only ever answers for GH_USER, so it can't be used as a general GitHub proxy.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const QUERY = `
  query Contributions($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
`;

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type Calendar = {
  total: number;
  weeks: { contributionDays: { date: string; contributionCount: number; color: string; level: number }[] }[];
};

// Per-instance cache: keeps visitor traffic well inside GitHub's rate limit
// while staying at most a few minutes behind the profile.
const CACHE_MS = 5 * 60 * 1000;
let cached: { at: number; body: Calendar } | null = null;

async function loadCalendar(token: string, user: string): Promise<Calendar> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-github-contributions",
    },
    body: JSON.stringify({ query: QUERY, variables: { userName: user } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const body = await res.json();
  const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("GitHub GraphQL returned no calendar");

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: day.contributionCount,
        color: "",
        level: LEVELS[day.contributionLevel] ?? 0,
      })),
    })),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (status: number, body: object, extra: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json", ...extra },
    });

  if (req.method !== "GET") return json(405, { error: "Method not allowed" });

  const token = Deno.env.get("GH_CONTRIB_TOKEN");
  const user = Deno.env.get("GH_USER") ?? "chanchalvdev";
  if (!token) return json(500, { error: "GH_CONTRIB_TOKEN secret not configured" });

  if (!cached || Date.now() - cached.at > CACHE_MS) {
    try {
      cached = { at: Date.now(), body: await loadCalendar(token, user) };
    } catch (err) {
      // Serve the last good copy over an error; the tile keeps its snapshot otherwise.
      if (!cached) return json(502, { error: String(err) });
    }
  }

  return json(200, cached.body, { "Cache-Control": "public, max-age=300" });
});
