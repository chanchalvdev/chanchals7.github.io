import { skillGroups } from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  return (
    <SectionShell id="skills">
      <Reveal>
        <SectionHeading eyebrow="Stack" title="What I build with" />
      </Reveal>

      <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={Math.min(gi, 2) * 80} className={cn("h-full", gi === 0 && "sm:col-span-2")}>
            <div className={cn("tile h-full p-6 sm:p-7", gi === 0 && "tile-lime")}>
              <h3 className="text-xl font-bold tracking-tight">{group.title}</h3>
              <p className={cn("mt-1.5 text-sm leading-6", gi === 0 ? "on-tile-soft" : "text-ink-soft")}>
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cn("chip", gi === 0 && "bg-[var(--tile-lime-fg)] text-[var(--tile-lime-bg)]")}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
