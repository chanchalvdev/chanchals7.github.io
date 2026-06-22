import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";
import { heroMetrics, profile, proofPoints } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/button-link";

export function HeroSection() {
  return (
    <section
      id="main"
      className="relative min-h-svh overflow-hidden bg-linear-to-br from-background via-page to-surface-warm px-5 pb-0 pt-28 sm:px-8 lg:pt-32"
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 -z-40 overflow-hidden opacity-[0.03] select-none pointer-events-none">
        <div className="absolute -top-20 -left-10 -rotate-15 text-[12rem] font-black leading-none text-ink whitespace-nowrap">
          AI SECURITY ENGINEER
        </div>
        <div className="absolute top-40 -right-20 rotate-8 text-[10rem] font-black leading-none text-ink whitespace-nowrap">
          PRODUCT ENGINEERING
        </div>
        <div className="absolute top-80 -left-32 -rotate-12 text-[11rem] font-black leading-none text-ink whitespace-nowrap">
          AGENTIC AI SYSTEMS
        </div>
        <div className="absolute bottom-40 -right-10 rotate-10 text-[9rem] font-black leading-none text-ink whitespace-nowrap">
          KUBERNETES CLOUD
        </div>
        <div className="absolute bottom-10 -left-20 -rotate-8 text-[10rem] font-black leading-none text-ink whitespace-nowrap">
          GOLANG REACT UI/UX
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-30 opacity-30">
        <div className="absolute top-20 left-10 size-48 rounded-full bg-amber/20 blur-3xl animate-float" />
        <div className="absolute top-40 right-20 size-64 rounded-full bg-coral/15 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 size-56 rounded-full bg-violet/10 blur-3xl animate-float-slow" />
      </div>

      {/* Fine grid overlay */}
      <div className="fine-grid absolute inset-0 -z-20 opacity-40" />

      {/* Gradient orbs - warmer tones */}
      <div
        className="orb absolute -top-40 left-1/4 -z-20 size-100 bg-linear-to-br from-amber/12 to-coral/8"
        aria-hidden="true"
      />
      <div
        className="orb absolute bottom-0 right-1/4 -z-20 size-80 bg-linear-to-br from-violet/8 to-cobalt/6"
        aria-hidden="true"
      />
      <div
        className="orb absolute top-40 right-0 -z-20 size-64 bg-linear-to-br from-lime/6 to-signal/4"
        aria-hidden="true"
      />

      {/* Hero portrait — desktop */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-[8%] lg:right-[10%] xl:right-[15%] z-10 hidden lg:block pointer-events-none"
        style={{ width: 350, height: 600 }}
      >
        <Image
          src="/chanchal-hero.webp"
          alt=""
          fill
          priority
          sizes="350px"
          className="object-cover object-top"
          style={{
            mixBlendMode: "multiply",
            opacity: 0.92,
            filter: "contrast(1.08) brightness(0.98) saturate(0.9) drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
            clipPath: "inset(0 0 0 0 round 0)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 60%, rgba(0,0,0,0.4) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 60%, rgba(0,0,0,0.4) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="container-shell flex min-h-[74svh] flex-col justify-between gap-10">
        <div className="max-w-160 pt-8 sm:pt-12 lg:pt-16">
          {/* Status badges */}
          <div className="fade-up mb-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/10 px-3.5 py-1.5 text-sm font-semibold text-amber shadow-sm">
              <span className="pulse-dot size-1.5 rounded-full bg-amber" />
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
