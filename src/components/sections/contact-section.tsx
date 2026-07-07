import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 sm:py-24">
      <Reveal>
        <div className="container-shell glow-ring relative overflow-hidden rounded-2xl border border-border bg-surface text-ink shadow-(--shadow-float)">
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          {/* Gradient orbs inside card */}
          <div className="relative overflow-hidden">
            <div
              className="orb absolute -top-40 -right-20 size-96 bg-cobalt/20 opacity-70"
              aria-hidden="true"
            />
            <div
              className="orb absolute -bottom-20 left-10 size-72 bg-violet/15 opacity-60"
              aria-hidden="true"
            />

            <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.68fr] lg:p-16">
              {/* Left: copy */}
              <div>
                <p className="text-kicker text-signal">Start here</p>
                <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-[3.25rem]">
                  Let&apos;s build{" "}
                  <span className="gradient-text">intelligent systems</span>{" "}
                  that scale.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-8 text-ink/55">
                  I&apos;m best suited for teams building secure, AI-native, high-clarity
                  software for technical and operational users. If you&apos;re into system
                  design, distributed systems, or AI — let&apos;s connect.
                </p>

                {/* Proof points */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {[
                    "Open to full-time",
                    "Senior IC roles",
                    "Remote / UAE / India",
                    "Relocation-ready worldwide",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-ink/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: contact methods */}
              <div className="flex flex-col gap-3">
                {/* Primary: email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex min-h-28 items-center justify-between gap-5 rounded-xl bg-linear-to-r from-cobalt to-signal px-6 py-5 text-page shadow-cobalt transition hover:-translate-y-1 hover:brightness-110"
                >
                  <span>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-page/70">
                      <Mail className="size-3.5" aria-hidden="true" />
                      Email — preferred
                    </span>
                    <span className="mt-2.5 block text-lg font-bold">{profile.email}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-page/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-page"
                    aria-hidden="true"
                  />
                </a>

                {/* Secondary row */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${profile.phone}`}
                    className="rounded-xl border border-border bg-surface-soft/60 p-5 text-ink/65 transition hover:border-cobalt/35 hover:text-ink"
                  >
                    <Phone className="size-4 text-cobalt" aria-hidden="true" />
                    <span className="mt-4 block text-sm font-bold">UAE</span>
                    <span className="mt-1 block text-sm text-ink/45">{profile.phone}</span>
                  </a>
                  {profile.phoneIndia && (
                    <a
                      href={`tel:${profile.phoneIndia.replace(/\s/g, "")}`}
                      className="rounded-xl border border-border bg-surface-soft/60 p-5 text-ink/65 transition hover:border-cobalt/35 hover:text-ink"
                    >
                      <Phone className="size-4 text-cobalt" aria-hidden="true" />
                      <span className="mt-4 block text-sm font-bold">India</span>
                      <span className="mt-1 block text-sm text-ink/45">{profile.phoneIndia}</span>
                    </a>
                  )}
                </div>
                <div className="rounded-xl border border-border bg-surface-soft/60 p-5 text-ink/65">
                  <MapPin className="size-4 text-cobalt" aria-hidden="true" />
                  <span className="mt-4 block text-sm font-bold">Location</span>
                  <span className="mt-1 block text-sm text-ink/45">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
