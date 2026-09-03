import { skillGroups } from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="bg-background">
      <Reveal>
        <SectionHeading
          eyebrow="Sheet 05 / Bill of Materials"
          title="Stack manifest"
          description="The stack matters because of what it enables: clear interfaces, secure services, intelligent agents, reliable delivery, and operational trust."
        />
      </Reveal>

      <Reveal delay={110}>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse">
            <thead>
              <tr className="border-b-2 border-ink text-left">
                <th className="w-12 pb-3 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-ink/40">
                  No.
                </th>
                <th className="w-44 pb-3 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-ink/40">
                  Description
                </th>
                <th className="w-72 pb-3 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-ink/40">
                  Spec
                </th>
                <th className="pb-3 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-ink/40">
                  Parts
                </th>
              </tr>
            </thead>
            <tbody>
              {skillGroups.map((group, gi) => (
                <tr key={group.title} className="border-b border-border align-top">
                  <td className="py-4 pr-3 font-mono text-[0.72rem] tabular-nums text-ink/40">
                    {String(gi + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4 pr-4 text-sm font-bold text-ink">{group.title}</td>
                  <td className="py-4 pr-4 text-sm leading-6 text-ink/50">{group.description}</td>
                  <td className="py-4 font-mono text-[0.78rem] text-ink/60">
                    {group.items.join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </SectionShell>
  );
}
