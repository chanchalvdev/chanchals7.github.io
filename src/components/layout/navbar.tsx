"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { navItems, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
          ? "border-b border-border bg-page/85 py-2.5 shadow-lg backdrop-blur-xl"
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

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt sm:gap-3"
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
          <span className="hidden sm:block">
            <span className="block text-sm font-bold leading-tight text-ink">Chanchal Verma</span>
            <span className="block text-[10px] font-medium leading-tight text-ink/55 sm:text-xs">
              AI Security • Full Stack • UI/UX
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm font-medium text-ink/65 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-cobalt/8 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center rounded-lg border border-border bg-surface/60 text-ink/60 transition-all duration-200 hover:border-cobalt/40 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center rounded-lg border border-border bg-surface/60 text-ink/60 transition-all duration-200 hover:border-cobalt/40 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon className="size-3.5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-linear-to-r from-cobalt to-signal px-4 text-sm font-bold text-page shadow-cobalt transition-all duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            <Mail className="size-4" aria-hidden="true" />
            <span className="hidden lg:inline">Let&apos;s talk</span>
            <span className="lg:hidden">Contact</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-border bg-surface/80 text-ink transition-all duration-200 hover:border-cobalt/40 hover:text-cobalt active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "grid border-t border-border bg-page/95 shadow-lg backdrop-blur-xl transition-[grid-template-rows] duration-300 md:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-ink/70 transition-all duration-200 hover:bg-cobalt/8 hover:text-cobalt active:bg-cobalt/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-ink/70 transition-all hover:border-cobalt/40 hover:text-cobalt"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-ink/70 transition-all hover:border-cobalt/40 hover:text-cobalt"
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-cobalt to-signal text-sm font-bold text-page shadow-cobalt transition-all hover:brightness-110 active:scale-95"
              >
                <Mail className="size-4" aria-hidden="true" />
                Let&apos;s talk
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
