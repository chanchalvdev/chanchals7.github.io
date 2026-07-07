"use client";

import { useEffect, useState } from "react";
import { Radar } from "lucide-react";
import type { ConsoleScene } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const SCENE_DURATION_MS = 9000;

const lineTones: Record<ConsoleScene["lines"][number]["tone"], string> = {
  dim: "text-ink/45",
  muted: "text-ink/35",
  command: "text-signal",
  result: "text-ink/80",
};

const chipTones: Record<ConsoleScene["chips"][number]["tone"], string> = {
  amber: "border-amber/30 bg-amber/10 text-amber",
  coral: "border-coral/30 bg-coral/10 text-coral",
  violet: "border-violet/30 bg-violet/10 text-violet",
  signal: "border-signal/30 bg-signal/10 text-signal",
  cobalt: "border-cobalt/30 bg-cobalt/10 text-cobalt",
};

export function HeroConsole({ scenes }: { scenes: ConsoleScene[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || scenes.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % scenes.length),
      SCENE_DURATION_MS,
    );
    return () => clearInterval(timer);
  }, [paused, scenes.length]);

  const scene = scenes[index % scenes.length];
  if (!scene) return null;

  return (
    <div
      className="glow-ring float-y-slow absolute left-0 top-1/2 w-[400px] -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-surface/85 shadow-(--shadow-float) backdrop-blur-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="scan-line" />

      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-coral/70" />
          <span className="size-2.5 rounded-full bg-amber/70" />
          <span className="size-2.5 rounded-full bg-signal/70" />
        </div>
        <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/40">
          {scene.title}
        </p>
        <Radar className="size-3.5 text-cobalt" />
      </div>

      {/* Terminal body — keyed by scene so entrance animations replay */}
      <div key={scene.id} className="grid gap-2.5 px-4 py-4 font-mono text-[0.72rem] leading-5">
        {scene.lines.map((line, i) => (
          <div
            key={`${scene.id}-${i}`}
            className={cn("term-line", lineTones[line.tone])}
            style={{ animationDelay: `${400 + i * 400}ms` }}
          >
            {line.prefix ? <span className="text-cobalt">{line.prefix}</span> : null}
            {line.text}
          </div>
        ))}

        {/* Chips */}
        <div
          className="term-line flex flex-wrap items-center gap-2"
          style={{ animationDelay: `${400 + scene.lines.length * 400}ms` }}
        >
          {scene.chips.map((chip) => (
            <span
              key={chip.text}
              className={cn(
                "rounded border px-1.5 py-0.5 text-[0.62rem] font-bold",
                chipTones[chip.tone],
              )}
            >
              {chip.text}
            </span>
          ))}
        </div>

        {/* Confidence bar */}
        <div
          className="term-line mt-1"
          style={{ animationDelay: `${600 + scene.lines.length * 400}ms` }}
        >
          <div className="flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/40">
            <span>Confidence</span>
            <span className="text-cobalt">{scene.confidence}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="confidence-fill h-full rounded-full bg-linear-to-r from-cobalt to-signal"
              style={{
                width: `${scene.confidence}%`,
                animationDelay: `${800 + scene.lines.length * 400}ms`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between border-t border-border bg-surface-soft/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-signal">
          <span className="pulse-dot size-1.5 rounded-full bg-signal" />
          {scene.footerLeft}
        </span>
        <span className="flex items-center gap-2.5">
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink/35">
            {scene.footerRight}
          </span>
          {scenes.length > 1 ? (
            <span className="flex items-center gap-1" role="tablist" aria-label="Console scenes">
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.title}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "size-1.5 rounded-full transition",
                    i === index ? "bg-cobalt" : "bg-ink/20 hover:bg-ink/40",
                  )}
                />
              ))}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}
