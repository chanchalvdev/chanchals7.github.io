import Link from "next/link";
import { ArrowUpRight, Code2, Gauge, Sparkles } from "lucide-react";
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
    <article className="group relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-soft lg:grid lg:grid-cols-[0.11fr_0.49fr_0.4fr]">
      {/* Top category accent bar */}
      <div className={`absolute inset-x-0 top-0 h-0.5 ${accentBar} opacity-80`} />

      {/* Index + category column */}
      <div className="flex items-center justify-between p-5 lg:flex-col lg:items-start lg:justify-start lg:p-6">
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/30">
          0{index + 1}
        </p>
        <Tag tone={tagTone} className="lg:mt-8">
          {project.category}
        </Tag>
      </div>

      {/* Main content */}
      <div className="border-t border-ink/8 p-5 lg:border-l lg:border-t-0 lg:p-6">
        <div className="block pointer-events-none">
          <h3 className="max-w-xl text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {project.title}
          </h3>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/58">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>

      {/* Metrics + actions */}
      <div className="flex flex-col gap-4 border-t border-ink/8 p-5 lg:border-l lg:border-t-0 lg:p-6">
        {/* Impact */}
        <div className="rounded-lg border border-cobalt/12 bg-cobalt/4 p-4">
          <p className="flex items-center gap-1.5 text-xs font-bold text-cobalt">
            <Gauge className="size-3.5" aria-hidden="true" />
            Product impact
          </p>
          <p className="mt-2 text-sm leading-6 text-ink/65">{project.impact}</p>
        </div>

        {/* Metric tiles */}
        <div className="grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg bg-page p-3 text-center">
              <p className="text-base font-bold text-ink">{metric.value}</p>
              <p className="mt-0.5 text-[0.65rem] font-semibold leading-4 text-ink/42">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            disabled
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink/50 px-4 text-sm font-semibold text-white cursor-not-allowed opacity-60"
          >
            Case study
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
          {project.links.github ? (
            <button
              disabled
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-ink/10 bg-white px-4 text-sm font-semibold text-ink/50 cursor-not-allowed opacity-60"
            >
              <Code2 className="size-3.5" aria-hidden="true" />
              Source
            </button>
          ) : null}
          {project.featured ? (
            <span className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-lime-light px-3 text-sm font-semibold text-lime-700 opacity-60">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Featured
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
