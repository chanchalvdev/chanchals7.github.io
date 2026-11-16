/**
 * "Shipping" feed: recent public work, turned into short readable lines for
 * the strip under the navbar. It merges three GitHub searches — merged PRs,
 * open PRs (work in progress) and commits pushed straight to a default
 * branch — so the strip follows the latest activity, not only merges. Uses
 * GitHub's public search API, so it needs no token and never sees private or
 * client repositories.
 */

export type ShipEvent = {
  verb: string;
  subject: string;
  repo: string;
  url: string;
  /** When it happened: merge time, last update of an open PR, or commit time. */
  at: string;
};

/** Branch-style prefixes → the verb a reader sees. `null` hides the PR. */
const PREFIX_VERBS: Record<string, string | null> = {
  feature: "Shipped",
  feat: "Shipped",
  fix: "Fixed",
  hotfix: "Fixed",
  perf: "Sped up",
  refactor: "Refactored",
  // Docs PRs read oddly out of context ("Documented rename to …"); the strip
  // is for shipped work.
  docs: null,
  doc: null,
  test: "Tested",
  tests: "Tested",
  redesign: "Redesigned",
  polish: "Polished",
  chore: null,
  ci: null,
  build: null,
  deps: null,
  release: null,
  revert: null,
};

const ACRONYMS = new Set([
  "ai", "api", "llm", "rag", "ui", "ux", "soc", "ioc", "mcp", "sse", "rbac",
  "sso", "ci", "cd", "sdk", "sql", "jwt", "aa", "ocr", "pr", "ws", "url", "seo",
]);

/** Mixed-case terms an all-caps or all-lowercase rule would mangle. */
const SPECIAL_CASE: Record<string, string> = {
  llmops: "LLMOps",
  mlops: "MLOps",
  devops: "DevOps",
  github: "GitHub",
  graphql: "GraphQL",
  openai: "OpenAI",
  postgresql: "PostgreSQL",
  oauth: "OAuth",
};

function humanize(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (SPECIAL_CASE[lower]) return SPECIAL_CASE[lower];
      return ACRONYMS.has(lower) ? word.toUpperCase() : lower;
    })
    .join(" ");
}

/**
 * "feature/soc-metrics-dashboard" → { verb: "Shipped", subject: "SOC metrics dashboard" }
 * "fix: login loop"                → { verb: "Fixed",   subject: "login loop" }
 * "Add retries to the worker"      → { verb: "Merged",  subject: "Add retries to the worker" }
 * Housekeeping (chore/ci/deps…) returns null so it never reaches the strip.
 */
export function describePullRequest(
  title: string,
  fallbackVerb = "Merged",
): { verb: string; subject: string } | null {
  const match = title.trim().match(/^([a-z]+)(?:\([^)]*\))?\s*[/:]\s*(.+)$/i);
  if (match) {
    const prefix = match[1].toLowerCase();
    if (prefix in PREFIX_VERBS) {
      const verb = PREFIX_VERBS[prefix];
      if (!verb) return null;
      const rest = match[2].includes("/") ? match[2].split("/").pop()! : match[2];
      const subject = humanize(rest);
      return subject ? { verb, subject } : null;
    }
  }
  const subject = title.trim();
  return subject ? { verb: fallbackVerb, subject } : null;
}

/** "3h", "2d", "3w" — or null once it's old enough that an age would read as stale. */
export function shortAge(iso: string, now = Date.now()): string | null {
  const minutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days <= 7) return `${days}d`;
  return null;
}

/** The strip hides itself once the newest merge is older than this. */
export const SHIPPING_STALE_DAYS = 30;

export function isStale(events: ShipEvent[], now = Date.now()): boolean {
  if (!events.length) return true;
  const newest = Math.max(...events.map((event) => new Date(event.at).getTime()));
  return now - newest > SHIPPING_STALE_DAYS * 86_400_000;
}

type SearchItem = {
  title: string;
  html_url: string;
  repository_url: string;
  closed_at: string | null;
  updated_at?: string;
  state?: string;
  pull_request?: { merged_at?: string | null };
};

type CommitItem = {
  sha: string;
  html_url: string;
  parents?: unknown[];
  commit: { message: string; committer?: { date?: string } | null; author?: { date?: string } | null };
  repository: { name: string; full_name: string; private?: boolean };
};

/** A commit this close before a merge in the same repo most likely came in through that PR. */
const PR_COMMIT_WINDOW_MS = 24 * 60 * 60 * 1000;

const sortNewest = (events: ShipEvent[]) => events.sort((a, b) => Date.parse(b.at) - Date.parse(a.at));

/** Pull-request search results (merged or open) → events. */
export function toShipEvents(items: SearchItem[], limit = 8): ShipEvent[] {
  const events = items
    .map((item): ShipEvent | null => {
      const mergedAt = item.pull_request?.merged_at ?? null;
      const open = item.state === "open";
      // Open PRs are work in progress; closed-unmerged PRs never shipped.
      const at = open ? (item.updated_at ?? null) : (mergedAt ?? (item.state ? null : item.closed_at));
      const described = describePullRequest(item.title, open ? "Building" : "Merged");
      if (!described || !at) return null;
      return {
        verb: open ? "Building" : described.verb,
        subject: described.subject,
        repo: item.repository_url.split("/").pop() ?? "",
        url: item.html_url,
        at,
      };
    })
    .filter((event): event is ShipEvent => event !== null);
  return sortNewest(events).slice(0, limit);
}

/**
 * Commit search results → events for work pushed straight to a default
 * branch. Merge commits and commits that sit just before a merged PR in the
 * same repo are dropped (the PR already covers them), and a burst of commits
 * to one repo on one day collapses to its newest commit.
 */
export function commitsToShipEvents(items: CommitItem[], mergedPrs: ShipEvent[]): ShipEvent[] {
  const candidates: ShipEvent[] = [];
  for (const item of items) {
    if (item.repository.private) continue;
    if ((item.parents?.length ?? 1) > 1) continue;
    const date = item.commit.committer?.date ?? item.commit.author?.date;
    if (!date) continue;
    const time = Date.parse(date);
    const repo = item.repository.name;
    const viaPr = mergedPrs.some((pr) => {
      if (pr.repo !== repo) return false;
      const merged = Date.parse(pr.at);
      return merged >= time && merged - time <= PR_COMMIT_WINDOW_MS;
    });
    if (viaPr) continue;
    const described = describePullRequest(item.commit.message.split("\n")[0] ?? "", "Committed");
    if (!described) continue;
    candidates.push({ ...described, repo, url: item.html_url, at: new Date(time).toISOString() });
  }
  const seen = new Set<string>();
  return sortNewest(candidates).filter((event) => {
    const key = `${event.repo}:${event.at.slice(0, 10)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const API = "https://api.github.com";

async function search<T>(path: string, init?: RequestInit): Promise<T[]> {
  const res = await fetch(`${API}${path}`, { headers: { Accept: "application/vnd.github+json" }, ...init });
  if (!res.ok) throw new Error(`GitHub search failed (${res.status})`);
  const body = (await res.json()) as { items?: T[] };
  return body.items ?? [];
}

export async function fetchShipEvents(username: string, init?: RequestInit, limit = 8): Promise<ShipEvent[]> {
  const q = (query: string) => encodeURIComponent(query);
  const [merged, open, commits] = await Promise.allSettled([
    search<SearchItem>(`/search/issues?q=${q(`author:${username} is:pr is:merged is:public`)}&sort=updated&order=desc&per_page=30`, init),
    search<SearchItem>(`/search/issues?q=${q(`author:${username} is:pr is:open is:public`)}&sort=updated&order=desc&per_page=10`, init),
    search<CommitItem>(`/search/commits?q=${q(`author:${username} is:public`)}&sort=committer-date&order=desc&per_page=50`, init),
  ]);
  // Merged PRs are the core of the feed; the other two are best-effort extras.
  if (merged.status === "rejected") throw merged.reason;
  const mergedEvents = toShipEvents(merged.value, 30);
  const openEvents = open.status === "fulfilled" ? toShipEvents(open.value, 10) : [];
  const commitEvents = commits.status === "fulfilled" ? commitsToShipEvents(commits.value, mergedEvents) : [];
  return sortNewest([...openEvents, ...mergedEvents, ...commitEvents]).slice(0, limit);
}
