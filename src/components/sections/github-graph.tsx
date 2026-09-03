import { ArrowUpRight, GitCommitVertical } from "lucide-react";
import { profile } from "@/content/portfolio";
import { getPortfolioSignals } from "@/lib/portfolio-live";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const levels = [
  "bg-ink/8",
  "bg-cobalt/25",
  "bg-cobalt/45",
  "bg-cobalt/70",
  "bg-cobalt",
];

export async function GitHubGraph() {
  const signals = await getPortfolioSignals({
    username: "chanchalvdev",
    token: process.env.GITHUB_TOKEN,
  });

  return (
    <section id="github" className="section-shell section-band">
      <div className="container-shell grid min-w-0 gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:items-center">
        {/* Left */}
        <div>
          <SectionHeading
            eyebrow="Sheet 06 / Open Work"
            title="Work signal."
            description="Public activity treated as a product signal: useful, current, and grounded in actual shipping rhythm."
          />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-10 items-center gap-2 border-[1.5px] border-ink bg-ink px-5 font-mono text-[0.74rem] font-bold uppercase tracking-[0.05em] text-page transition hover:border-cobalt hover:bg-cobalt hover:text-white"
          >
            Open GitHub
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* Right: graph card */}
        <div className="min-w-0 overflow-hidden border border-border bg-surface p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-5 border-b border-border pb-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <GitCommitVertical className="size-4 text-cobalt" aria-hidden="true" />
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/36">
                  @{profile.github.split("/").pop()} · {signals.refreshedAt}
                </p>
              </div>
              <h3 className="text-display mt-3 text-xl text-ink">Contribution rhythm</h3>
            </div>

            {/* Stat tiles */}
            <div className="flex gap-3 sm:grid sm:grid-cols-3">
              {[
                {
                  value: signals.contributionTotal > 0 ? signals.contributionTotal.toLocaleString() : "—",
                  label: "contributions",
                },
                {
                  value: signals.activeWeeks > 0 ? signals.activeWeeks : "—",
                  label: "active weeks",
                },
                {
                  value: signals.focusRepos > 0 ? signals.focusRepos : "—",
                  label: "public repos",
                },
              ].map((stat) => (
                <div key={stat.label} className="border border-border bg-muted/40 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-0.5 text-[0.65rem] font-semibold text-ink/42">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution grid */}
          <div className="mt-5 overflow-x-auto pb-2">
            <div
              className="grid w-max grid-flow-col grid-rows-7 gap-0.75"
              aria-label="GitHub contribution graph"
            >
              {signals.weeks.flatMap((week, wi) =>
                week.map((level, di) => (
                  <span
                    key={`${wi}-${di}`}
                    className={cn(
                      "size-2.75 rounded-sm ring-1 ring-ink/8 transition hover:ring-cobalt/30",
                      levels[level] ?? levels[0],
                    )}
                    title={`Week ${wi + 1}, day ${di + 1}: level ${level}`}
                  />
                )),
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-between text-[0.65rem] font-semibold text-ink/38">
            <span>Less</span>
            <div className="flex items-center gap-1.5">
              {levels.map((level, i) => (
                <span
                  key={level}
                  className={cn("size-2.75 rounded-sm", level)}
                  aria-label={`Level ${i}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
