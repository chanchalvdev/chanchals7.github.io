import { BrainCircuit, ShieldCheck, Waypoints } from "lucide-react";
import { capabilities, profile } from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

const methodIcons = [ShieldCheck, BrainCircuit, Waypoints];

const capabilityColors = [
  { icon: "bg-cobalt/10 text-cobalt", border: "border-cobalt/20", accent: "bg-cobalt" },
  { icon: "bg-violet/10 text-violet", border: "border-violet/20", accent: "bg-violet" },
  { icon: "bg-signal/10 text-signal", border: "border-signal/20", accent: "bg-signal" },
];

export function AboutSection() {
  return (
    <SectionShell id="about">
      <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Intelligent systems, built calm."
            description="The work is not just shipping features. It is designing systems that stay understandable when the stakes are high."
          />
        </Reveal>

        <Reveal className="grid gap-5" delay={120}>
          <p className="text-2xl font-semibold leading-normal text-ink/85">
            {profile.narrative}
          </p>
          <p className="max-w-3xl text-lg leading-8 text-ink/55">
            Recently I have worked on AI-driven threat detection, agentic
            investigation flows, generated SDKs, infrastructure APIs, identity,
            RBAC, audit trails, and cloud deployment pipelines — across the
            full stack, from UI/UX to Kubernetes.
          </p>
        </Reveal>
      </div>

      {/* Capability cards */}
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {capabilities.map((item, index) => {
          const Icon = methodIcons[index] ?? ShieldCheck;
          const color = capabilityColors[index] ?? capabilityColors[0];
          return (
            <Reveal key={item.title} delay={index * 110} as="article">
              <div
                className={`group relative h-full overflow-hidden rounded-xl border ${color.border} bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)`}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 ${color.accent}`} />

                <div className="mb-7 flex items-center justify-between">
                  <div className={`grid size-11 place-items-center rounded-xl ${color.icon}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink/25">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/55">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
