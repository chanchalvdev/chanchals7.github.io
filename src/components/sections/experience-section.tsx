import { Award, GraduationCap, Languages, MapPin, ScrollText } from "lucide-react";
import {
  certifications,
  education,
  experience,
  honors,
  languages,
} from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function ExperienceSection() {
  return (
    <SectionShell id="experience" className="section-band">
      <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
        {/* Left: heading + education + credentials */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Five years, four countries, one trajectory."
              description="From freelance MERN work in Pune to AI-driven cybersecurity in Abu Dhabi — each role compounding toward intelligent, secure systems."
            />
          </Reveal>

          <Reveal delay={140} className="mt-10 grid gap-3">
            {/* Education */}
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/40">
                <GraduationCap className="size-3.5 text-cobalt" aria-hidden="true" />
                Education
              </p>
              {education.map((item) => (
                <div key={item.school} className="mt-4 first:mt-3">
                  <p className="text-sm font-bold text-ink">{item.school}</p>
                  <p className="mt-0.5 text-xs text-ink/50">
                    {item.degree} · {item.period}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications + honors + languages */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-border bg-surface p-5">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/40">
                  <ScrollText className="size-3.5 text-signal" aria-hidden="true" />
                  Certifications
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span
                      key={cert}
                      className="rounded-md border border-signal/20 bg-signal/8 px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-signal"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/40">
                  <Award className="size-3.5 text-amber" aria-hidden="true" />
                  Honors
                </p>
                <ul className="mt-3 grid gap-1.5">
                  {honors.map((honor) => (
                    <li key={honor} className="text-sm font-medium text-ink/65">
                      {honor}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/40">
                  <Languages className="size-3.5 text-violet" aria-hidden="true" />
                  Languages
                </p>
                <p className="mt-2 text-sm font-medium text-ink/65">
                  {languages.join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: timeline */}
        <div className="relative pl-8">
          <span className="timeline-rail" aria-hidden="true" />
          <div className="grid gap-4">
            {experience.map((item, index) => (
              <Reveal key={`${item.company}-${item.period}`} delay={index * 90} as="article">
                <div className="group relative rounded-xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-cobalt/30 hover:shadow-(--shadow-lift)">
                  {/* Node on the rail */}
                  <span
                    className={`absolute -left-8 top-7 size-4 -translate-x-[3px] rounded-full border-2 ${
                      index === 0
                        ? "border-cobalt bg-cobalt/25 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                        : "border-ink/25 bg-page"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cobalt">
                      {item.period}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-ink/40">
                      <MapPin className="size-3" aria-hidden="true" />
                      {item.location}
                    </p>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-ink">{item.company}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-signal">{item.role}</p>
                  <p className="mt-3 text-sm leading-7 text-ink/55">{item.summary}</p>

                  <ul className="mt-4 grid gap-2 border-t border-border pt-4">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5 text-sm leading-6 text-ink/60">
                        <span
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-cobalt/70"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
