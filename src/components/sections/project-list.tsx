import type { Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectList({
  projects,
  title = "Things I've built",
  eyebrow = "Work",
}: {
  projects: Project[];
  title?: string;
  eyebrow?: string;
}) {
  const orderedProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.sortScore - a.sortScore,
  );

  return (
    <section id="projects" className="section-shell">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description="Agents, RAG pipelines, and the platforms around them — each framed by the real problem, the system decision, and what it made possible."
          />
        </Reveal>

        <div className="mt-10 grid items-start gap-3.5 md:grid-cols-2">
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
