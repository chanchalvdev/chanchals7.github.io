import { GraduationCap, Languages, MapPin } from "lucide-react";
import {
  education,
  experience,
  languages,
  profile,
} from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function ExperienceSection() {
  return (
    <SectionShell id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="Journey"
          title="Where I've shipped"
          description="From mentoring 200+ developers in Bengaluru to building AI products in Abu Dhabi — every role closer to the people using what I build."
        />
      </Reveal>

      <div className="mt-10 grid gap-3.5 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <ol className="tile p-6 sm:p-8">
            {experience.map((item, index) => (
              <li
                key={`${item.company}-${item.period}`}
                className="grid gap-1.5 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <p className="pt-1 font-mono text-xs tabular-nums text-ink-faint">{item.period}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold text-ink">{item.role.trim()}</h3>
                    {index === 0 ? (
                      <span className="rounded-full bg-[var(--tile-lime-bg)] px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-[var(--tile-lime-fg)]">
                        NOW
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-ink-soft">
                    <span className="font-semibold text-ink">{item.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {item.location}
                    </span>
                  </p>
                  <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">{item.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="grid content-start gap-3.5 lg:col-span-4">
          <Reveal>
            <div className="tile tile-ink p-6 sm:p-7">
              <p className="lbl on-tile-soft">In my words</p>
              <p className="mt-3 text-[1.05rem] leading-relaxed">{profile.narrative}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="tile tile-lav p-6 sm:p-7">
              <p className="lbl on-tile-soft flex items-center gap-2">
                <GraduationCap className="size-4" aria-hidden="true" />
                Education
              </p>
              <ul className="mt-4 space-y-4">
                {education.map((item) => (
                  <li key={item.school}>
                    <p className="font-bold leading-tight">{item.degree.replace(" — ", " in ")}</p>
                    <p className="on-tile-soft mt-1 text-sm">
                      {item.school} · {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="tile p-6 sm:p-7">
              <p className="lbl flex items-center gap-2 text-ink-faint">
                <Languages className="size-4" aria-hidden="true" />
                Languages
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {languages.map((language) => (
                  <li key={language} className="chip">{language}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
