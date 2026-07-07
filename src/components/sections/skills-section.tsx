import { skillGroups } from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

const groupAccents = [
  { dot: "bg-cobalt", ring: "border-cobalt/15", badge: "bg-cobalt/8 text-cobalt" },
  { dot: "bg-signal", ring: "border-signal/15", badge: "bg-signal/8 text-signal" },
  { dot: "bg-violet", ring: "border-violet/15", badge: "bg-violet/8 text-violet" },
  { dot: "bg-amber",  ring: "border-amber/20",  badge: "bg-amber/10 text-amber"  },
  { dot: "bg-coral",  ring: "border-coral/20",  badge: "bg-coral/10 text-coral"  },
];

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="bg-background">
      <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Skills"
            title="A capability matrix, not a keyword wall."
            description="The stack matters because of what it enables: clear interfaces, secure services, intelligent agents, reliable delivery, and operational trust."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, gi) => {
            const accent = groupAccents[gi] ?? groupAccents[0];
            return (
              <Reveal key={group.title} delay={gi * 90} as="article" className={gi === 2 ? "md:col-span-2" : undefined}>
                <div
                  className={`h-full rounded-xl border ${accent.ring} bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-soft)`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`size-2 rounded-full ${accent.dot}`} />
                    <h3 className="text-base font-bold text-ink">{group.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink/50">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={`rounded-md border px-2.5 py-1 font-mono text-[0.7rem] font-semibold ${accent.badge} ${accent.ring}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
