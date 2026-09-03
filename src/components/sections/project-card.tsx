import Link from "next/link";
import { ArrowUpRight, Code2, Lock } from "lucide-react";
import type { Project } from "@/content/portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isRestricted = Boolean(project.confidential);

  return (
    <article className="grid gap-5 border-t border-border py-9 first:border-t-0 lg:grid-cols-[3.25rem_1fr]">
      {/* Part callout badge */}
      <div>
        <span className="part-badge">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="leader-block">
        <div>
          {/* Spec head */}
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-display text-xl font-bold text-ink sm:text-2xl">{project.title}</h3>
            {isRestricted ? (
              <span className="inline-flex items-center gap-1.5 border border-cobalt bg-cobalt-light px-2 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-cobalt">
                <Lock className="size-3" aria-hidden="true" />
                Restricted
              </span>
            ) : (
              <span className="border border-signal bg-signal/10 px-2 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-signal">
                In service
              </span>
            )}
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink/40">
              {project.category} · {project.year}
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-base leading-7 text-ink/60">{project.description}</p>

          {/* Spec table */}
          <div className="mt-5 max-w-2xl">
            <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-2.5 text-sm">
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] leading-6 text-ink/40">
                Materials
              </p>
              <p className="font-mono text-[0.78rem] leading-6 text-ink/65">
                {project.stack.slice(0, 7).join(" · ")}
              </p>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-2.5 text-sm">
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] leading-6 text-ink/40">
                Performance
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {project.metrics.map((metric) => (
                  <p key={metric.label} className="leading-6 text-ink/60">
                    <span className="font-mono font-semibold text-ink">{metric.value}</span>{" "}
                    <span className="text-xs">{metric.label}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-2.5 text-sm">
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] leading-6 text-ink/40">
                Notes
              </p>
              <p className="leading-6 text-ink/55">{project.impact}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-5">
            {project.caseStudyReady ? (
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 border-b-[1.5px] border-cobalt pb-0.5 font-mono text-[0.74rem] font-bold uppercase tracking-[0.05em] text-ink transition hover:text-cobalt"
              >
                Open case file
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            ) : null}
            {!isRestricted && project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border-b-[1.5px] border-border pb-0.5 font-mono text-[0.74rem] font-bold uppercase tracking-[0.05em] text-ink/70 transition hover:border-cobalt hover:text-cobalt"
              >
                <Code2 className="size-3.5" aria-hidden="true" />
                View source
              </a>
            ) : null}
            {isRestricted ? (
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 font-mono text-[0.74rem] font-bold uppercase tracking-[0.05em] text-ink/35">
                Drawing sealed — NDA
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
