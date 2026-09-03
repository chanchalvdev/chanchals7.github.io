import { capabilities, profile } from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function AboutSection() {
  return (
    <SectionShell id="about">
      <Reveal>
        <SectionHeading
          eyebrow="Sheet 02 / General Notes"
          title="Intelligent systems, built calm."
        />
      </Reveal>

      <Reveal delay={120}>
        <p className="text-display mt-9 max-w-3xl text-2xl leading-[1.2] text-ink sm:text-3xl">
          &ldquo;My best work happens at the intersection of{" "}
          <span className="gradient-text">AI and cloud systems</span> — interfaces that stay calm
          under pressure, platforms that stay reliable, and agents that decide faster than we
          can.&rdquo;
        </p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-ink/55 sm:text-lg">
          Recently I have worked on AI-driven threat detection, agentic investigation flows,
          generated SDKs, infrastructure APIs, identity, RBAC, audit trails, and cloud deployment
          pipelines — across the full stack, from UI/UX to Kubernetes.
        </p>
      </Reveal>

      {/* Numbered notes */}
      <div className="mt-12">
        {capabilities.map((item, index) => (
          <Reveal key={item.title} delay={index * 90} as="article">
            <div className="grid grid-cols-[2.75rem_1fr] gap-5 border-t border-dashed border-border py-6 first:border-t-0">
              <span className="part-badge size-8 text-xs">{index + 1}</span>
              <div>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-7 text-ink/55">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Narrative footnote kept for SEO parity with profile data */}
      <p className="sr-only">{profile.narrative}</p>
    </SectionShell>
  );
}
