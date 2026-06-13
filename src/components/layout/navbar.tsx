"use client";

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-white/90 backdrop-blur-2xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-cobalt focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Chanchal Verma home"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-cobalt font-mono text-[0.8rem] font-bold text-white shadow-cobalt/50 shadow-sm transition-transform group-hover:-translate-y-0.5">
            CV
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-ink">Chanchal Verma</span>
            <span className="block text-xs font-medium text-ink/44">Full Stack Engineer</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/52 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-md transition hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center rounded-lg border border-ink/10 bg-white text-ink/60 transition hover:-translate-y-0.5 hover:border-cobalt/25 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="size-[1.05rem]" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center rounded-lg border border-ink/10 bg-white text-ink/60 transition hover:-translate-y-0.5 hover:border-cobalt/25 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon className="size-3.5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-cobalt px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cobalt/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="grid size-9 place-items-center rounded-lg border border-ink/10 bg-white text-ink transition hover:border-cobalt/25 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "grid border-t border-ink/8 bg-white/96 backdrop-blur-xl transition-[grid-template-rows] duration-300 lg:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-ink/68 transition hover:bg-cobalt-light hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2 border-t border-ink/8 pt-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-page text-sm font-semibold text-ink/70 transition hover:text-cobalt"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-cobalt text-sm font-semibold text-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
