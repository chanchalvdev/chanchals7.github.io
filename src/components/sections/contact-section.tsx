import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/content/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="container-shell relative overflow-hidden rounded-2xl bg-ink text-white shadow-float">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        {/* Gradient orbs inside dark card */}
        <div className="relative overflow-hidden">
          <div
            className="orb absolute -top-40 -right-20 size-96 bg-cobalt/25 opacity-60"
            aria-hidden="true"
          />
          <div
            className="orb absolute -bottom-20 left-10 size-72 bg-violet/20 opacity-50"
            aria-hidden="true"
          />

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.68fr] lg:p-16">
            {/* Left: copy */}
            <div>
              <p className="text-kicker text-lime">Start here</p>
              <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-[3.25rem]">
                Bring me in where product clarity and system depth both matter.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-white/56">
                I&apos;m best suited for teams building secure, reliable, high-clarity software for
                technical and operational users.
              </p>

              {/* Proof points */}
              <div className="mt-10 flex flex-wrap gap-3">
                {["Open to full-time", "Senior IC roles", "Remote / UAE / India"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/14 px-4 py-1.5 text-sm font-semibold text-white/70"
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
                className="group flex min-h-28 items-center justify-between gap-5 rounded-xl bg-white px-6 py-5 text-ink shadow-float transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              >
                <span>
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/44">
                    <Mail className="size-3.5" aria-hidden="true" />
                    Email — preferred
                  </span>
                  <span className="mt-2.5 block text-lg font-bold text-ink">{profile.email}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-ink/36 transition group-hover:text-cobalt group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>

              {/* Secondary row */}
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${profile.phone}`}
                  className="rounded-xl border border-white/12 p-5 text-white/65 transition hover:border-white/25 hover:bg-white/8 hover:text-white"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  <span className="mt-4 block text-sm font-bold">UAE</span>
                  <span className="mt-1 block text-sm text-white/42">{profile.phone}</span>
                </a>
                {profile.phoneIndia && (
                  <a
                    href={`tel:${profile.phoneIndia.replace(/\s/g, "")}`}
                    className="rounded-xl border border-white/12 p-5 text-white/65 transition hover:border-white/25 hover:bg-white/8 hover:text-white"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    <span className="mt-4 block text-sm font-bold">India</span>
                    <span className="mt-1 block text-sm text-white/42">{profile.phoneIndia}</span>
                  </a>
                )}
              </div>
              <div className="rounded-xl border border-white/12 p-5 text-white/65">
                <MapPin className="size-4" aria-hidden="true" />
                <span className="mt-4 block text-sm font-bold">Location</span>
                <span className="mt-1 block text-sm text-white/42">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
