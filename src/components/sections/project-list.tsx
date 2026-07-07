"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";
import { projectCategories, type Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type SortMode = "selected" | "recent" | "impact";

export function ProjectList({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof projectCategories)[number]>("All");
  const [sortMode, setSortMode] = useState<SortMode>("selected");

  const visibleProjects = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    return [...filtered].sort((a, b) => {
      if (sortMode === "recent") return Number(b.year) - Number(a.year);
      if (sortMode === "impact") return b.sortScore - a.sortScore;
      return Number(b.featured) - Number(a.featured) || b.sortScore - a.sortScore;
    });
  }, [activeCategory, projects, sortMode]);

  return (
    <section id="projects" className="section-shell">
      <div className="container-shell">
        {/* Header row */}
        <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work"
              title="Work shown as product evidence."
              description="Each case study is framed by the user pressure, the system decision, and the product result it made possible."
            />
          </Reveal>

          <div className="flex flex-col gap-3 lg:items-end">
            <label className="sr-only" htmlFor="project-sort">
              Sort projects
            </label>
            <div className="inline-flex w-full items-center gap-2 rounded-xl border border-border bg-surface px-3 transition hover:border-cobalt/30 lg:w-auto">
              <SlidersHorizontal className="size-4 shrink-0 text-cobalt" aria-hidden="true" />
              <select
                id="project-sort"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="h-11 flex-1 cursor-pointer bg-transparent text-sm font-semibold text-ink outline-none lg:flex-none"
              >
                <option value="selected">Selected first</option>
                <option value="recent">Newest first</option>
                <option value="impact">Impact first</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter by category">
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "h-9 cursor-pointer rounded-full border px-4 text-sm font-semibold transition",
                  isActive
                    ? "border-cobalt bg-cobalt/10 text-cobalt shadow-cobalt"
                    : "border-border bg-surface text-ink/55 hover:border-cobalt/30 hover:text-cobalt",
                )}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Count bar */}
        <div className="mt-8 flex items-center gap-2 border-y border-border py-3.5 text-sm font-semibold text-ink/45">
          <LayoutGrid className="size-4 text-cobalt" aria-hidden="true" />
          {visibleProjects.length} case {visibleProjects.length === 1 ? "study" : "studies"} in this view
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-4">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 2) * 80}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
