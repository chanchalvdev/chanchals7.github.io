import type { Project } from "@/content/portfolio";
import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectList({ projects }: { projects: Project[] }) {
  const orderedProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.sortScore - a.sortScore,
  );

  return (
    <section id="projects" className="section-shell">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Sheet 04 / Component Specs"
            title="Exploded view — work"
            description="Each case study is framed by the user pressure, the system decision, and the product result it made possible."
          />
        </Reveal>

        <div className="mt-10">
          {orderedProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 2) * 80}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
