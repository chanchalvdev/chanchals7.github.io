import { skillGroups } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

const groupAccents = [
  { dot: "bg-cobalt", ring: "border-cobalt/15", badge: "bg-cobalt/8 text-cobalt" },
  { dot: "bg-signal", ring: "border-signal/15", badge: "bg-signal/8 text-signal" },
  { dot: "bg-violet", ring: "border-violet/15", badge: "bg-violet/8 text-violet" },
  { dot: "bg-amber",  ring: "border-amber/20",  badge: "bg-amber/10 text-amber"  },
];

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="bg-white">
      <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <SectionHeading
          eyebrow="Systems"
          title="A capability matrix, not a keyword wall."
          description="The stack matters because of what it enables: clear interfaces, secure services, reliable delivery, and operational trust."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, gi) => {
            const accent = groupAccents[gi] ?? groupAccents[0];
            return (
              <article
                key={group.title}
                className={`rounded-xl border ${accent.ring} bg-page p-5 transition hover:-translate-y-0.5 hover:shadow-soft`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`size-2 rounded-full ${accent.dot}`} />
                  <h3 className="text-base font-bold text-ink">{group.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/52">{group.description}</p>
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
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
