import { Globe, Mail, MapPin } from "lucide-react";
import { heroMetrics, heroRoles, profile } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/button-link";
import { RoleRotator } from "@/components/ui/role-rotator";

export function HeroSection() {
  const [summaryBefore, summaryAfter] = profile.summary.split("CPX");

  return (
    <section id="main" className="px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Status badges */}
        <div className="fade-up mb-7 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-[0.7rem] font-semibold tracking-[0.04em] text-signal">
            <span className="pulse-dot size-1.5 rounded-full bg-signal" />
            Open For Work
          </span>
          <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[0.7rem] font-semibold tracking-[0.04em] text-ink/60">
            <MapPin className="size-3.5 text-ink/40" aria-hidden="true" />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[0.7rem] font-semibold tracking-[0.04em] text-ink/60">
            <Globe className="size-3.5 text-ink/40" aria-hidden="true" />
            Relocation — Worldwide
          </span>
        </div>

        {/* Name — drawing title */}
        <h1 className="text-display fade-up delay-1 text-6xl font-extrabold text-ink sm:text-8xl lg:text-[7.2rem]">
          Chanchal
          <br />
          <span className="gradient-text">Verma</span>
        </h1>

        {/* Scale bar — rotating role */}
        <p className="fade-up delay-2 mt-6 flex items-center gap-2.5 font-mono text-[0.85rem] text-ink/60">
          <span aria-hidden="true" className="text-ink/40">◂</span>
          <RoleRotator roles={heroRoles} />
          <span aria-hidden="true" className="text-ink/40">▸</span>
        </p>

        {/* Summary */}
        <p className="fade-up delay-3 mt-5 max-w-xl text-[1.1rem] leading-[1.65] text-ink/80">
          {summaryBefore}
          <span className="font-bold text-cobalt">CPX</span>
          {summaryAfter}
        </p>

        {/* CTAs */}
        <div className="fade-up delay-4 mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#projects" variant="primary">
            Open component specs ▸
          </ButtonLink>
          <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
            <Mail className="size-4" aria-hidden="true" />
            Contact — email
          </ButtonLink>
        </div>

        {/* Dimension ruler — key metrics */}
        <div className="fade-up delay-5 mt-[3.25rem]">
          <div className="dim-ruler" aria-hidden="true" />
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="dim-cell px-4 pb-0 pt-[0.9rem] first:pl-0 sm:px-6">
                <p className="text-display text-[1.9rem] font-bold text-ink">{metric.value}</p>
                <p className="mt-0.5 font-mono text-[0.63rem] font-semibold uppercase tracking-[0.04em] text-ink/45">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
