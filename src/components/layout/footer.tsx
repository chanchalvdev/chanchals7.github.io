import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  const handle = (url: string) => url.split("/").filter(Boolean).pop();

  const socials = [
    { label: "GitHub", value: handle(profile.github), href: profile.github },
    { label: "LinkedIn", value: `in/${handle(profile.linkedin)}`, href: profile.linkedin },
    ...(profile.twitter ? [{ label: "X", value: `@${handle(profile.twitter)}`, href: profile.twitter }] : []),
  ];

  return (
    <footer id="contact" className="px-3 pb-6 pt-14 sm:px-6">
      <div className="mx-auto grid max-w-[82rem] gap-3.5 lg:grid-cols-12">
        <div className="tile tile-lime p-8 sm:p-12 lg:col-span-8">
          <p className="lbl on-tile-soft">Contact</p>
          <h2 className="text-display mt-4 max-w-2xl text-4xl font-extrabold sm:text-6xl">
            Have a problem worth an agent? Let&apos;s <span className="serif-accent">ship</span> it.
          </h2>
          <p className="on-tile-soft mt-5 max-w-lg text-[1.05rem] leading-relaxed">
            Open to AI Engineer and Forward Deployed Engineer roles — based in {profile.location},
            happy to relocate.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex h-12 max-w-full items-center gap-2 rounded-full bg-[var(--tile-lime-fg)] px-6 text-sm font-semibold text-[var(--tile-lime-bg)] transition hover:opacity-90"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </a>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="tile tile-hover flex items-center justify-between p-6"
            >
              <span>
                <span className="lbl block text-ink-faint">{social.label}</span>
                <span className="mt-1 block text-lg font-bold text-ink">{social.value}</span>
              </span>
              <ArrowUpRight className="size-5 text-ink-soft" aria-hidden="true" />
            </a>
          ))}
          <Link href="/blog" className="tile tile-hover tile-ink flex items-center justify-between p-6">
            <span>
              <span className="lbl on-tile-soft block">Writing</span>
              <span className="mt-1 block text-lg font-bold">Notes on building agents</span>
            </span>
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <p className="px-2 pt-2 text-sm text-ink-faint lg:col-span-12">
          © {year} {profile.name} · Built with Next.js, deployed on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
