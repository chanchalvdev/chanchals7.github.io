import { GraduationCap, Languages, MapPin } from "lucide-react";
import {
  education,
  experience,
  languages,
} from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

const axisYears = ["2021", "2022", "2023", "2024", "2025", "2026"];

export function ExperienceSection() {
  return (
    <SectionShell id="experience" className="section-band">
      <Reveal>
        <SectionHeading
          eyebrow="Sheet 03 / Assembly Timeline"
          title="Career axis"
          description="From mentoring MERN developers in Bengaluru to AI-driven cybersecurity in Abu Dhabi — each role compounding toward intelligent, secure systems."
        />
      </Reveal>

      {/* Year axis */}
      <Reveal delay={100}>
        <div className="mt-12 hidden sm:block" aria-hidden="true">
          <div className="flex justify-between px-1">
            {axisYears.map((year) => (
              <span key={year} className="relative font-mono text-[0.64rem] text-ink/40">
                {year}
                <span className="absolute left-1/2 top-[1.35rem] h-2.5 w-px bg-ink" />
              </span>
            ))}
          </div>
          <div className="mt-2 h-0.5 bg-ink" />
        </div>
      </Reveal>

      {/* Stations */}
      <div className="mt-6">
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.period}`} delay={Math.min(index, 2) * 90} as="article">
            <div className="grid gap-2 border-t border-border py-7 first:border-t-0 lg:grid-cols-[4rem_10rem_1fr] lg:gap-6">
              <p className="font-mono text-[0.72rem] text-ink/35 tabular-nums">
                {String(experience.length - index).padStart(2, "0")}
              </p>
              <p className="font-mono text-[0.72rem] leading-5 text-ink/55">{item.period}</p>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-bold text-ink">{item.role}</h3>
                  <p className="font-mono text-[0.72rem] font-medium text-cobalt">
                    {item.company}
                  </p>
                  <p className="flex items-center gap-1 font-mono text-[0.68rem] text-ink/40">
                    <MapPin className="size-3" aria-hidden="true" />
                    {item.location}
                  </p>
                </div>
                <p className="mt-2.5 max-w-2xl text-sm leading-7 text-ink/55">{item.summary}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Education + languages */}
      <Reveal delay={120}>
        <div className="mt-10 grid gap-4 border-t-2 border-ink pt-8 sm:grid-cols-2">
          <div className="border border-border bg-surface p-5">
            <p className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink/45">
              <GraduationCap className="size-3.5 text-cobalt" aria-hidden="true" />
              Education
            </p>
            {education.map((item) => (
              <div key={item.school} className="mt-3">
                <p className="text-sm font-bold text-ink">{item.school}</p>
                <p className="mt-0.5 font-mono text-xs text-ink/50">
                  {item.degree} · {item.period}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-border bg-surface p-5">
            <p className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink/45">
              <Languages className="size-3.5 text-cobalt" aria-hidden="true" />
              Languages
            </p>
            <p className="mt-3 font-mono text-sm text-ink/65">{languages.join(" · ")}</p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
