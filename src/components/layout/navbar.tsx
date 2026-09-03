"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const sheetLinks = [
  { no: "01", label: "Arrangement", href: "/#main" },
  { no: "02", label: "Notes", href: "/#about" },
  { no: "03", label: "Timeline", href: "/#experience" },
  { no: "04", label: "Components", href: "/#projects" },
  { no: "05", label: "Open Work", href: "/#github" },
  { no: "06", label: "Materials", href: "/#skills" },
  { no: "07", label: "Field Notes", href: "/blog" },
  { no: "08", label: "Title Block", href: "/#contact" },
];

export function Navbar() {
  const [active, setActive] = useState(-1);

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

  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-page px-4 py-[1.1rem] sm:px-6 lg:px-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-cobalt focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-page"
      >
        Skip to content
      </a>

      <Link
        href="/"
        className="font-mono text-[0.72rem] tracking-[0.04em] text-ink/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
        aria-label="Chanchal Verma home"
      >
        DWG NO. CV-2026-01 · REV C
      </Link>

      <nav className="hidden flex-wrap gap-x-5 gap-y-1 lg:flex" aria-label="Sections">
        {sheetLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "border-b-2 pb-[0.2rem] font-mono text-[0.7rem] font-medium tracking-[0.05em] transition",
              active === i
                ? "border-cobalt text-ink"
                : "border-transparent text-ink/55 hover:text-ink",
            )}
          >
            <span className="mr-1.5 text-ink/40">{link.no}</span>
            {link.label}
          </a>
        ))}
      </nav>

      <ThemeToggle />
    </header>
  );
}
