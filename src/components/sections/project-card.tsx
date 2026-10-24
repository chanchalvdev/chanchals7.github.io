import Link from "next/link";
import { ArrowUpRight, Code2, Lock } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const TONES = ["tile-sky", "", "tile-lav", "tile-peach"] as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isRestricted = Boolean(project.confidential);
  const tone = TONES[index % TONES.length];
  const muted = tone ? "on-tile-soft" : "text-ink-soft";

  return (
    <article className={cn("tile tile-hover flex h-full flex-col", tone)}>
      {project.coverImage ? (
        <div className="aspect-[1816/954] overflow-hidden bg-[#0b1530]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized */}
          <img src={project.coverImage} alt="" loading="lazy" className="size-full object-cover" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className={cn("lbl", muted)}>
            {project.category} · {project.year}
          </p>
          {isRestricted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--tile-ink-bg)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--tile-ink-fg)]">
              <Lock className="size-3" aria-hidden="true" />
              NDA
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.75rem]">
          {project.title.split(" — ")[0]}
        </h3>
        <p className={cn("mt-2.5 text-[0.95rem] leading-relaxed", muted)}>{project.description}</p>

        <dl className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-black/[0.05] px-3.5 py-2 dark:bg-white/[0.07]">
              <dt className="sr-only">{metric.label}</dt>
              <dd className="text-base font-bold leading-tight">{metric.value}</dd>
              <dd className={cn("text-xs", muted)}>{metric.label}</dd>
            </div>
          ))}
        </dl>

        <p className={cn("mt-4 font-mono text-xs leading-relaxed", muted)}>
          {project.stack.slice(0, 7).join(" · ")}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.caseStudyReady ? (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--tile-ink-bg)] px-4 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
            >
              Read case study
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          ) : null}
          {!isRestricted && project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-black/[0.06] px-4 text-sm font-semibold transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <Code2 className="size-4" aria-hidden="true" />
              Source
            </a>
          ) : null}
          {isRestricted ? (
            <span className={cn("text-sm", muted)}>Client work — details on request</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
