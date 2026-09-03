import { Globe, Mail, MapPin } from "lucide-react";
import { heroMetrics, heroRoles, profile } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/button-link";
import { RoleRotator } from "@/components/ui/role-rotator";

export function HeroSection() {
  return (
    <section id="main" className="fine-grid relative overflow-hidden border-b border-border px-5 pb-14 pt-32 sm:px-8 lg:pt-36">
      <div className="mx-auto w-full max-w-6xl">
        {/* Status badges */}
        <div className="fade-up mb-8 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-signal">
            <span className="pulse-dot size-1.5 rounded-full bg-signal" />
            Open for work
          </span>
          <span className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-ink/60">
            <MapPin className="size-3.5 text-ink/40" aria-hidden="true" />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-ink/60">
            <Globe className="size-3.5 text-ink/40" aria-hidden="true" />
            Relocation — worldwide
          </span>
        </div>

        {/* Name — drawing title */}
        <h1 className="text-display fade-up delay-1 text-6xl text-ink sm:text-8xl lg:text-[7.5rem]">
          Chanchal
          <br />
          <span className="gradient-text">Verma</span>
        </h1>

        {/* Scale bar — rotating role */}
        <p className="fade-up delay-2 mt-7 flex items-center gap-3 font-mono text-sm font-medium text-ink/60 sm:text-base">
          <span aria-hidden="true" className="text-ink/30">◂</span>
          <RoleRotator roles={heroRoles} />
          <span aria-hidden="true" className="text-ink/30">▸</span>
        </p>

        {/* Headline */}
        <p className="fade-up delay-2 mt-5 max-w-2xl text-2xl font-semibold leading-snug text-ink/90 sm:text-3xl">
          {profile.headline}
        </p>

        {/* Summary */}
        <p className="fade-up delay-3 mt-5 max-w-2xl text-base leading-7 text-ink/55 sm:text-lg">
          {profile.summary}
        </p>

        {/* CTAs */}
        <div className="fade-up delay-4 mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#projects" variant="primary">
            Open component specs ↓
          </ButtonLink>
          <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
            <Mail className="size-4" aria-hidden="true" />
            Contact — email
          </ButtonLink>
        </div>

        {/* Dimension ruler — key metrics */}
        <div className="fade-up delay-5 mt-16">
          <div className="dim-ruler" aria-hidden="true" />
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="dim-cell px-4 py-5 first:pl-0 sm:px-6">
                <p className="text-display text-3xl text-ink sm:text-4xl">{metric.value}</p>
                <p className="mt-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-ink/45">
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
