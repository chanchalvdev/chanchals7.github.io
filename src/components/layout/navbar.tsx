"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const sheetLinks = [
  { no: "02", label: "Notes", href: "/#about" },
  { no: "03", label: "Timeline", href: "/#experience" },
  { no: "04", label: "Components", href: "/#projects" },
  { no: "05", label: "Materials", href: "/#skills" },
  { no: "06", label: "Field Notes", href: "/#writing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out",
        scrolled
          ? "border-border bg-page/85 py-2.5 backdrop-blur-md"
          : "border-transparent bg-transparent py-4",
      )}
    >
      {/* Scroll progress — redline */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-cobalt transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-cobalt focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-page"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-[0.72rem] font-semibold tracking-[0.04em] text-ink/70 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Chanchal Verma home"
        >
          DWG NO. CV-2026 · REV C
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {sheetLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-mono text-[0.7rem] font-medium tracking-[0.04em] text-ink/55 transition hover:text-ink"
            >
              <span className="mr-1.5 text-ink/30 transition group-hover:text-cobalt">{link.no}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
