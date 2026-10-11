import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: profile.github, Icon: Github, external: true },
    { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin, external: true },
    { label: "X (Twitter)", href: profile.twitter, Icon: XIcon, external: true },
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail, external: false },
  ].filter((link) => Boolean(link.href));

  return (
    <footer id="contact" className="border-t border-border bg-background px-5 py-14 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="bp-divider font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
          Sheet 07 / Title Block
        </p>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-display max-w-xl text-3xl font-bold text-ink sm:text-4xl">
            Open for new engagements
          </h2>

          <ul className="flex items-center gap-3">
            {links.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex size-11 items-center justify-center border-[1.5px] border-ink text-ink transition hover:border-cobalt hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 font-mono text-[0.68rem] text-ink/40">
          <p>© {year} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
