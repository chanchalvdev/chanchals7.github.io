"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b border-border bg-page/80 py-2.5 backdrop-blur-md"
          : "bg-transparent py-4 sm:py-5",
      )}
    >
      {/* Scroll progress */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-cobalt via-signal to-violet transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-cobalt focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-page"
      >
        Skip to content
      </a>

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group inline-flex rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Chanchal Verma home"
        >
          <span
            className={cn(
              "glow-cobalt grid shrink-0 place-items-center rounded-xl bg-linear-to-br from-cobalt to-signal font-mono font-bold text-page transition-all duration-300 group-hover:scale-105",
              scrolled ? "size-9 text-sm" : "size-10 text-sm sm:size-11 sm:text-base",
            )}
          >
            CV
          </span>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
