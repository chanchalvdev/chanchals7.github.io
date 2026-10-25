import type { GitHubContributionWeek } from "@/lib/github";
import type { ShipEvent } from "@/lib/shipping";
import { BrandIcon } from "@/components/ui/brand-icon";

// Lime ramp for the calendar (--gh-1…4 flip per theme so busier days always
// read stronger); the empty cell uses the theme's muted token.
const LEVELS = ["var(--muted)", "var(--gh-1)", "var(--gh-2)", "var(--gh-3)", "var(--gh-4)"];

function level(count: number, max: number) {
  if (count === 0) return 0;
  return Math.min(4, Math.ceil((count / Math.max(max, 1)) * 4));
}

/**
 * Build-time GitHub activity. Shows the last 26 weeks of the contribution
 * calendar when a token was available at build; otherwise falls back to the
 * latest merged PR so the tile never renders empty.
 */
export function GitHubTile({
  weeks,
  total,
  latest,
  href,
}: {
  weeks: GitHubContributionWeek[] | null;
  total: number | null;
  latest?: ShipEvent;
  href: string;
}) {
  const recent = weeks?.slice(-26) ?? [];
  const max = Math.max(0, ...recent.flatMap((week) => week.contributionDays.map((day) => day.contributionCount)));

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="tile tile-hover flex h-full flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="shrink-0">
        <p className="lbl flex items-center gap-1.5 text-ink-faint">
          <BrandIcon brand="github" className="size-3.5" />
          GitHub
        </p>
        {total !== null ? (
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink">
            {total.toLocaleString("en-US")}
            <span className="ml-1.5 text-sm font-medium tracking-normal text-ink-soft">contributions / yr</span>
          </p>
        ) : null}
        {latest ? (
          <p className="mt-1 text-sm text-ink-soft">
            latest <b className="font-semibold text-ink">{latest.repo}</b>
          </p>
        ) : null}
      </div>
      {recent.length ? (
        <div
          className="grid min-w-0 flex-1 grid-flow-col grid-rows-7 gap-[3px]"
          role="img"
          aria-label={`Contribution activity over the last ${recent.length} weeks`}
        >
          {recent.flatMap((week) =>
            week.contributionDays.map((day) => (
              <span
                key={day.date}
                className="aspect-square rounded-[3px]"
                style={{ background: LEVELS[level(day.contributionCount, max)] }}
              />
            )),
          )}
        </div>
      ) : null}
    </a>
  );
}
