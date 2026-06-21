import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";
import { heroMetrics, profile, proofPoints } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/button-link";

export function HeroSection() {
  return (
    <section
      id="main"
      className="relative min-h-[88svh] overflow-hidden px-5 pb-0 pt-8 sm:px-8 lg:pt-10"
    >
      {/* Background grid */}
      <div className="fine-grid absolute inset-0 -z-30 opacity-60" />

      {/* Gradient orbs */}
      <div
        className="orb absolute -top-40 left-1/4 -z-20 size-175 bg-cobalt/8"
        aria-hidden="true"
      />
      <div
        className="orb absolute bottom-0 right-1/4 -z-20 size-125 bg-signal/6"
        aria-hidden="true"
      />
      <div
        className="orb absolute top-40 right-0 -z-20 size-100 bg-violet/5"
        aria-hidden="true"
      />

      {/* White fade at top */}
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-white to-transparent" />

      {/* Hero portrait — desktop */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[18%] max-w-60 lg:block">
        <Image
          src="/chanchal-hero.webp"
          alt="Portrait of Chanchal Verma"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover object-[50%_15%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 22%, black 42%, black 80%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 22%, black 42%, black 80%, transparent 100%)",
          }}
        />
        {/* Portrait bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-page to-transparent" />
      </div>

      {/* Main content */}
      <div className="container-shell flex min-h-[74svh] flex-col justify-between gap-10">
        <div className="max-w-160 pt-8 sm:pt-12 lg:pt-16">
          {/* Status badges */}
          <div className="fade-up mb-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-cobalt/20 bg-cobalt-light px-3.5 py-1.5 text-sm font-semibold text-cobalt shadow-sm">
              <span className="pulse-dot size-1.5 rounded-full bg-cobalt" />
              Available for new projects
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink/70 shadow-sm">
              <MapPin className="size-3.5 text-ink/50" aria-hidden="true" />
              {profile.location}
            </span>
          </div>

          {/* Name */}
          <h1 className="fade-up delay-1 text-display text-5xl text-ink sm:text-6xl lg:text-[4.5rem]">
            {profile.name.split(" ").map((word, i) => (
              <span key={word}>
                {i === 1 ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
                {i < profile.name.split(" ").length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          {/* Headline */}
          <p className="fade-up delay-2 mt-5 text-2xl font-semibold leading-snug text-ink/75 sm:text-3xl">
            {profile.headline}
          </p>

          {/* Summary */}
          <p className="fade-up delay-3 mt-5 max-w-lg text-base leading-7 text-ink/58 sm:text-lg">
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

          {/* Mobile portrait */}
          <div className="fade-up delay-4 relative mt-9 h-36 overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-float sm:h-44 lg:hidden">
            <Image
              src="/chanchal-hero.webp"
              alt="Portrait of Chanchal Verma"
              fill
              sizes="(max-width: 1023px) 92vw"
              className="object-cover object-[50%_16%]"
            />
          </div>
        </div>

        {/* Metrics row */}
        <div className="fade-up grid gap-5 border-t border-ink/10 pt-6 sm:grid-cols-4 lg:max-w-3xl">
          {heroMetrics.map((metric, i) => (
            <div key={metric.label} className={i > 0 ? "sm:border-l sm:border-ink/10 sm:pl-5" : ""}>
              <p className="text-2xl font-bold tracking-tight text-ink">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-medium leading-5 text-ink/50">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Proof-points bar */}
      <div className="container-shell mt-8 rounded-t-2xl border border-b-0 border-ink/8 bg-white/80 py-4 pl-5 pr-5 backdrop-blur-md sm:pl-6 sm:pr-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/36">
            <Sparkles className="size-3" aria-hidden="true" />
            Core stack
          </span>
          {proofPoints.map((item) => (
            <span
              key={item}
              className="text-sm font-semibold text-ink/54 transition hover:text-cobalt"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
