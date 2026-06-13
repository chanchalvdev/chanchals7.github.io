import { ArrowUpRight, Cpu, ShieldCheck, Waypoints } from "lucide-react";
import { capabilities, experience, profile } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

const methodIcons = [ShieldCheck, Waypoints, Cpu];

const capabilityColors = [
  { icon: "bg-cobalt/10 text-cobalt", border: "border-cobalt/20", accent: "bg-cobalt" },
  { icon: "bg-signal/10 text-signal", border: "border-signal/20", accent: "bg-signal" },
  { icon: "bg-violet/10 text-violet", border: "border-violet/20", accent: "bg-violet" },
];

export function AboutSection() {
  return (
    <SectionShell id="about">
      <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <SectionHeading
          eyebrow="Method"
          title="Calm is a product quality."
          description="The work is not just shipping features. It is designing systems that stay understandable when the stakes are high."
        />

        <div className="grid gap-5">
          <p className="text-2xl font-semibold leading-normal text-ink/80">
            {profile.narrative}
          </p>
          <p className="max-w-3xl text-lg leading-8 text-ink/56">
            Recently I have worked on threat intelligence products, AI-assisted
            investigation flows, generated SDKs, infrastructure APIs, identity,
            RBAC, audit trails, and cloud deployment pipelines.
          </p>
        </div>
      </div>

      {/* Capability cards */}
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {capabilities.map((item, index) => {
          const Icon = methodIcons[index] ?? ShieldCheck;
          const color = capabilityColors[index] ?? capabilityColors[0];
          return (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-xl border ${color.border} bg-white p-6 transition hover:-translate-y-1 hover:shadow-lift`}
            >
              {/* Subtle top accent line */}
              <div className={`absolute inset-x-0 top-0 h-0.5 ${color.accent}`} />

              <div className="mb-7 flex items-center justify-between">
                <div className={`grid size-11 place-items-center rounded-xl ${color.icon}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs font-bold tracking-[0.18em] text-ink/24 uppercase">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/58">{item.text}</p>
            </article>
          );
        })}
      </div>

      {/* Experience cards */}
      <div className="mt-16 pt-2">
        <p className="text-kicker mb-6 text-ink/36">Experience</p>
        <div className="grid gap-4 lg:grid-cols-4">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              className="group relative rounded-xl border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:border-cobalt/20 hover:shadow-lift"
            >
              {/* Left accent */}
              <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-cobalt/0 transition group-hover:bg-cobalt/60" />

              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/36">
                  {item.period}
                </p>
                <ArrowUpRight className="size-3.5 shrink-0 text-ink/24 transition group-hover:text-cobalt" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{item.company}</h3>
              <p className="mt-1 text-xs font-semibold text-ink/48">{item.role}</p>
              <p className="mt-4 text-sm leading-6 text-ink/55">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
