import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function ProjectList({
  projects,
  title = "Things I've built",
  eyebrow = "Work",
  continued = false,
}: {
  projects: Project[];
  title?: string;
  eyebrow?: string;
  /** Homepage: carries straight on from the hero bento (which holds the flagship) with a compact header. */
  continued?: boolean;
}) {
  const orderedProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.sortScore - a.sortScore,
  );

  return (
    <section id="projects" className={continued ? "px-3 pb-14 sm:px-6 sm:pb-[4.5rem]" : "section-shell"}>
      <div className="container-shell">
        {continued ? (
          <div className="flex flex-wrap items-end justify-between gap-3 px-1 pb-4 pt-6">
            <div>
              <p className="bp-divider lbl text-ink-faint">{eyebrow}</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
            </div>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              All projects
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <Reveal>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description="Agents, RAG pipelines, and the platforms around them — each framed by the real problem, the system decision, and what it made possible."
            />
          </Reveal>
        )}

        <div className={cn("grid items-start gap-3.5 md:grid-cols-2", !continued && "mt-10")}>
          {orderedProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i % 2, 1) * 80}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
