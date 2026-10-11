"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const sheetLinks = [
  { no: "01", label: "Arrangement", href: "/#main" },
  { no: "02", label: "Notes", href: "/#about" },
  { no: "03", label: "Timeline", href: "/#experience" },
  { no: "04", label: "Components", href: "/#projects" },
  { no: "05", label: "Materials", href: "/#skills" },
  { no: "06", label: "Field Notes", href: "/blog" },
  { no: "07", label: "Title Block", href: "/#contact" },
];

export function Navbar() {
  const [active, setActive] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = sheetLinks.map((link) =>
      document.getElementById(link.href.split("#")[1] ?? ""),
    );

    // Every page renders the shared <Footer id="contact">, so its presence
    // alone doesn't mean we're on the homepage — check a section that only
    // exists there instead, otherwise leave nothing highlighted.
    if (!document.getElementById("about")) return;

    function onScroll() {
      const pos = window.scrollY + 160;
      let activeIndex = 0;
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

  const linkClass = (i: number) =>
    cn(
      "font-mono text-xs font-medium tracking-[0.05em] transition",
      active === i ? "text-ink" : "text-ink-faint hover:text-ink",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-7 lg:px-8">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-cobalt focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-page"
        >
          Skip to content
        </a>

        <Link
          href="/"
          className="font-mono text-xs tracking-[0.04em] text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Chanchal Verma home"
        >
          CV
        </Link>

        <nav className="hidden gap-x-5 lg:flex" aria-label="Sections">
          {sheetLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "border-b-2 pb-[0.2rem]",
                linkClass(i),
                active === i ? "border-cobalt" : "border-transparent",
              )}
            >
              <span className="mr-1.5 text-ink-faint">{link.no}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 place-items-center border-[1.5px] border-ink text-ink transition hover:border-cobalt hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt lg:hidden"
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
          className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-border bg-page px-4 py-2 sm:px-6 lg:hidden"
        >
          <ul>
            {sheetLinks.map((link, i) => (
              <li key={link.href} className="border-b border-border last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === i ? "location" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 text-sm",
                    linkClass(i),
                    active === i && "text-cobalt",
                  )}
                >
                  <span className="w-6 text-ink-faint">{link.no}</span>
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
