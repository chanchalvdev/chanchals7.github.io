import { Globe, Mail, MapPin, Sparkles } from "lucide-react";
import { heroMetrics, heroRoles, profile, proofPoints } from "@/content/portfolio";
import { HeroVisual } from "@/components/sections/hero-visual";
import { ButtonLink } from "@/components/ui/button-link";
import { RoleRotator } from "@/components/ui/role-rotator";

export function HeroSection() {
  return (
    <section
      id="main"
      className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-0 pt-28 sm:px-8 lg:pt-32"
    >
      {/* Ambient backdrop */}
      <div className="aurora" aria-hidden="true" />
      <div className="fine-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-page to-transparent"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative mx-auto flex w-full flex-1 flex-col justify-center gap-12 py-10 px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {/* Status badges */}
          <div className="fade-up mb-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1.5 text-sm font-semibold text-signal">
              <span className="pulse-dot size-1.5 rounded-full bg-signal" />
              Available for new projects
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-ink/65 backdrop-blur">
              <MapPin className="size-3.5 text-ink/45" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cobalt/25 bg-cobalt/8 px-3.5 py-1.5 text-sm font-semibold text-cobalt backdrop-blur">
              <Globe className="size-3.5" aria-hidden="true" />
              Open to worldwide relocation for the right opportunity
            </span>
          </div>

          {/* Name */}
          <h1 className="fade-up delay-1 text-display text-5xl text-ink sm:text-7xl lg:text-[5.5rem]">
            Chanchal{" "}
            <span className="gradient-text">Verma</span>
          </h1>

          {/* Rotating role */}
          <p className="fade-up delay-2 mt-5 text-lg font-semibold sm:text-2xl">
            <span className="text-ink/45">{"//"} </span>
            <RoleRotator roles={heroRoles} />
          </p>

          {/* Headline */}
          <p className="fade-up delay-2 mt-4 text-2xl font-semibold leading-snug text-ink/85 sm:text-3xl">
            {profile.headline}
          </p>

          {/* Summary */}
          <p className="fade-up delay-3 mt-5 max-w-2xl text-base leading-7 text-ink/55 sm:text-lg">
            {profile.summary}
          </p>

          {/* CTAs */}
          <div className="fade-up delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projects" showArrow variant="primary">
              View selected work
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
              <Mail className="size-4" aria-hidden="true" />
              Let&apos;s talk
            </ButtonLink>
          </div>
        </div>

        {/* Right: security console visual */}
        <HeroVisual />
        </div>

        {/* Metrics row */}
        <div className="fade-up delay-5 grid gap-5 border-t border-border pt-6 sm:grid-cols-4">
          {heroMetrics.map((metric, i) => (
            <div key={metric.label} className={i > 0 ? "sm:border-l sm:border-border sm:pl-5" : ""}>
              <p className="text-display text-3xl text-ink">{metric.value}</p>
              <p className="mt-1 text-sm font-medium leading-5 text-ink/50">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack marquee */}
      <div className="relative mx-auto w-full rounded-t-2xl border border-b-0 border-border bg-surface/70 py-4 backdrop-blur-md px-5 sm:px-8">
        <div className="flex items-center gap-5 px-5 sm:px-6">
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/40">
            <Sparkles className="size-3 text-cobalt" aria-hidden="true" />
            Core stack
          </span>
          <div className="marquee flex-1" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-track">
                {proofPoints.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-ink/55"
                  >
                    <span className="size-1 rounded-full bg-cobalt/60" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
