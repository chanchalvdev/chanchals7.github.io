/**
 * "Shipping" feed: recently merged public PRs, turned into short readable
 * lines for the strip under the navbar. Uses GitHub's public search API, so
 * it needs no token and never sees private or client repositories.
 */

export type ShipEvent = {
  verb: string;
  subject: string;
  repo: string;
  url: string;
  mergedAt: string;
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
export function describePullRequest(title: string): { verb: string; subject: string } | null {
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
  return subject ? { verb: "Merged", subject } : null;
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
  const newest = Math.max(...events.map((event) => new Date(event.mergedAt).getTime()));
  return now - newest > SHIPPING_STALE_DAYS * 86_400_000;
}

type SearchItem = {
  title: string;
  html_url: string;
  repository_url: string;
  closed_at: string | null;
  pull_request?: { merged_at?: string | null };
};

export function toShipEvents(items: SearchItem[], limit = 8): ShipEvent[] {
  return items
    .map((item) => {
      const described = describePullRequest(item.title);
      const mergedAt = item.pull_request?.merged_at ?? item.closed_at;
      if (!described || !mergedAt) return null;
      return {
        ...described,
        repo: item.repository_url.split("/").pop() ?? "",
        url: item.html_url,
        mergedAt,
      };
    })
    .filter((event): event is ShipEvent => event !== null)
    .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt))
    .slice(0, limit);
}

export async function fetchShipEvents(username: string, init?: RequestInit): Promise<ShipEvent[]> {
  const query = encodeURIComponent(`author:${username} is:pr is:merged is:public`);
  const res = await fetch(
    `https://api.github.com/search/issues?q=${query}&sort=updated&order=desc&per_page=30`,
    { headers: { Accept: "application/vnd.github+json" }, ...init },
  );
  if (!res.ok) throw new Error(`GitHub search failed (${res.status})`);
  const body = (await res.json()) as { items?: SearchItem[] };
  return toShipEvents(body.items ?? []);
}
