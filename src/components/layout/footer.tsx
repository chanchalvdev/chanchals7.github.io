import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { type Brand, BrandIcon } from "@/components/ui/brand-icon";

export function Footer() {
  const year = new Date().getFullYear();
  const handle = (url: string) => url.split("/").filter(Boolean).pop();

  const socials: { brand: Brand; label: string; value?: string; href: string; soon?: boolean }[] = [
    { brand: "github", label: "GitHub", value: handle(profile.github), href: profile.github },
    { brand: "linkedin", label: "LinkedIn", value: `in/${handle(profile.linkedin)}`, href: profile.linkedin },
    ...(profile.twitter
      ? [{ brand: "x" as const, label: "X", value: `@${handle(profile.twitter)}`, href: profile.twitter }]
      : []),
    { brand: "medium", label: "Medium", value: handle(profile.blog), href: profile.blog },
    // The channel is new: flagged "Soon" until videos are up — drop `soon` then.
    ...(profile.youtube
      ? [{ brand: "youtube" as const, label: "YouTube", value: handle(profile.youtube), href: profile.youtube, soon: true }]
      : []),
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
            Open to AI Engineer, Forward Deployed Engineer and AI Security Engineer roles — based in{" "}
            {profile.location}, happy to relocate.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex h-12 max-w-full items-center gap-2 rounded-full bg-[var(--tile-lime-fg)] px-6 text-sm font-semibold text-[var(--tile-lime-bg)] transition hover:opacity-90"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </a>
        </div>

        <div className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="tile tile-hover group flex items-center gap-3.5 px-5 py-4"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-surface-warm text-ink transition group-hover:bg-[var(--tile-ink-bg)] group-hover:text-[var(--tile-ink-fg)]">
                <BrandIcon brand={social.brand} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="lbl flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-faint">
                  {social.label}
                  {social.soon ? (
                    <span className="rounded-full bg-[var(--tile-peach-bg)] px-2 py-0.5 text-[var(--tile-peach-fg)]">
                      Soon
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate font-bold text-ink">{social.value}</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
          <Link href="/blog" className="tile tile-hover tile-ink flex items-center justify-between px-5 py-4 sm:col-span-2 lg:col-span-1">
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
