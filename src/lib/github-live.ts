import type { ContributionCalendar } from "@/lib/github";

/**
 * Live GitHub calendar for the homepage tile. The token lives only in the
 * github-contributions Supabase Edge Function; the browser calls that.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Opt-in (NEXT_PUBLIC_GITHUB_LIVE_ENABLED=true) once the function is deployed,
// so visitors never make a request that's bound to 404.
const enabled = process.env.NEXT_PUBLIC_GITHUB_LIVE_ENABLED === "true";

export const GITHUB_LIVE_ENDPOINT =
  enabled && supabaseUrl ? `${supabaseUrl}/functions/v1/github-contributions` : null;

export function isContributionCalendar(value: unknown): value is ContributionCalendar {
  if (!value || typeof value !== "object") return false;
  const { total, weeks } = value as Partial<ContributionCalendar>;
  return (
    typeof total === "number" &&
    Array.isArray(weeks) &&
    weeks.length > 0 &&
    weeks.every((week) => Array.isArray(week?.contributionDays))
  );
}

export async function fetchLiveContributions(signal?: AbortSignal): Promise<ContributionCalendar | null> {
  if (!GITHUB_LIVE_ENDPOINT) return null;
  const res = await fetch(GITHUB_LIVE_ENDPOINT, {
    signal,
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
  });
  if (!res.ok) throw new Error(`github-contributions ${res.status}`);
  const body: unknown = await res.json();
  return isContributionCalendar(body) ? body : null;
}
