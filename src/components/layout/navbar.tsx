"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/#projects" },
  { label: "Journey", href: "/#experience" },
  { label: "Stack", href: "/#skills" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [active, setActive] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.getElementById(link.href.split("#")[1] ?? ""),
    );

    // Every page renders the shared <Footer id="contact">, so its presence
    // alone doesn't mean we're on the homepage — check a section that only
    // exists there instead, otherwise leave nothing highlighted.
    if (!document.getElementById("experience")) return;

    function onScroll() {
      const pos = window.scrollY + 200;
      let activeIndex = -1;
      sections.forEach((section, i) => {
        if (section && section.offsetTop <= pos) activeIndex = i;
      });
      setActive(activeIndex);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-page/80 px-3 pb-2 pt-3 backdrop-blur-xl sm:px-6">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-page"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-[82rem] items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl pr-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Chanchal Verma home"
        >
          <span className="grid size-10 -rotate-6 place-items-center rounded-[0.85rem] bg-[var(--tile-ink-bg)] text-sm font-extrabold text-[var(--tile-lime-bg)] transition hover:rotate-0">
            CV
          </span>
          <span className="hidden text-[1.05rem] font-bold tracking-tight text-ink sm:inline">
            Chanchal Verma
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1.5">
          <nav className="hidden items-center lg:flex" aria-label="Sections">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === i ? "location" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active === i ? "bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)]" : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink-soft transition hover:bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-sections"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-sections"
          aria-label="Sections"
          className="tile mx-auto mt-2 max-h-[calc(100svh-5.5rem)] max-w-[82rem] overflow-y-auto p-2 shadow-float lg:hidden"
        >
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === i ? "location" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-2xl px-4 text-base font-medium transition",
                    active === i ? "bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)]" : "text-ink hover:bg-muted",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
