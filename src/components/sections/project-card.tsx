import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { Tag } from "@/components/ui/tag";

const categoryAccent: Record<string, string> = {
  Security: "bg-cobalt",
  Cloud:    "bg-signal",
  AI:       "bg-violet",
  Backend:  "bg-amber",
  Frontend: "bg-coral",
};

const categoryTag: Record<string, "blue" | "green" | "coral" | "neutral"> = {
  Security: "blue",
  Cloud:    "green",
  AI:       "coral",
  Backend:  "neutral",
  Frontend: "coral",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accentBar = categoryAccent[project.category] ?? "bg-cobalt";
  const tagTone   = categoryTag[project.category]   ?? "neutral";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-surface transition duration-300 hover:border-cobalt/25 hover:shadow-(--shadow-lift) lg:grid lg:grid-cols-[0.18fr_0.44fr_0.38fr]">
      {/* Top category accent bar */}
      <div className={`absolute inset-x-0 top-0 h-0.5 ${accentBar} opacity-80`} />

      {/* Left column: index, category, metrics */}
      <div className="flex items-center justify-between p-5 lg:flex-col lg:items-start lg:justify-start lg:p-5">
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/30">
          0{index + 1}
        </p>
        <Tag tone={tagTone} className="lg:mt-6">
          {project.category}
        </Tag>
        {/* Metric tiles stacked in left column */}
        <div className="hidden lg:mt-6 lg:flex lg:w-full lg:flex-col lg:gap-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-md bg-muted/60 px-3 py-2">
              <p className="text-sm font-bold text-ink">{metric.value}</p>
              <p className="text-[0.6rem] font-semibold leading-4 text-ink/45">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="border-t border-border p-5 lg:border-l lg:border-t-0 lg:p-6">
        <div className="pointer-events-none block">
          <h3 className="max-w-xl text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {project.title}
          </h3>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/55">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        {/* Metrics visible on mobile only */}
        <div className="mt-5 grid grid-cols-3 gap-2 lg:hidden">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-md bg-muted/60 p-2 text-center">
              <p className="text-sm font-bold text-ink">{metric.value}</p>
              <p className="text-[0.6rem] font-semibold leading-4 text-ink/45">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: image + actions */}
      <div className="flex flex-col gap-4 border-t border-border p-5 lg:border-l lg:border-t-0 lg:p-5">
        {/* Cover image */}
        {project.coverImage && (
          <div className="overflow-hidden rounded-lg border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={`${project.title} preview`}
              className="w-full transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {project.caseStudyReady ? (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-cobalt px-4 text-sm font-bold text-page transition hover:brightness-110"
            >
              Case study
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex h-10 cursor-not-allowed items-center gap-1.5 rounded-lg bg-cobalt/30 px-4 text-sm font-bold text-page/70 opacity-60"
            >
              Case study
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </button>
          )}
          {project.links.github ? (
            project.caseStudyReady ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-surface-soft px-4 text-sm font-semibold text-ink transition hover:border-cobalt/40 hover:text-cobalt"
              >
                <Code2 className="size-3.5" aria-hidden="true" />
                Source
              </a>
            ) : (
              <button
                disabled
                className="inline-flex h-10 cursor-not-allowed items-center gap-1.5 rounded-lg border border-border bg-surface-soft px-4 text-sm font-semibold text-ink/50 opacity-60"
              >
                <Code2 className="size-3.5" aria-hidden="true" />
                Source
              </button>
            )
          ) : null}
        </div>
      </div>
    </article>
  );
}
