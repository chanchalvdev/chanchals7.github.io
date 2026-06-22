import { Mail } from "lucide-react";
import { navItems, profile } from "@/content/portfolio";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/8 bg-linear-to-b from-white to-background px-5 py-12 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_auto] md:items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-amber to-coral font-mono text-sm font-bold text-white shadow-md">
                CV
              </span>
              <span className="text-sm font-bold text-ink">{profile.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-ink/60">
              Building secure product surfaces for teams that need clarity under pressure.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/40">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-ink/60 transition-colors hover:text-amber"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + email */}
          <div>
            <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/40">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink/10 bg-white px-3 text-sm font-semibold text-ink/60 transition-all hover:border-amber/30 hover:text-amber hover:bg-amber/5"
                aria-label="GitHub"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink/10 bg-white px-3 text-sm font-semibold text-ink/60 transition-all hover:border-cobalt/30 hover:text-cobalt hover:bg-cobalt/5"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="size-3.5" />
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-linear-to-r from-amber to-coral px-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/8 pt-6 text-xs font-medium text-ink/40">
          <p>© {year} {profile.name}. Built with Next.js & Tailwind CSS.</p>
          <p className="font-mono uppercase tracking-[0.12em]">Abu Dhabi, UAE</p>
        </div>
      </div>
    </footer>
  );
}
