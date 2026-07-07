import { Activity, ShieldCheck, Zap } from "lucide-react";
import { consoleScenes } from "@/content/portfolio";
import { HeroConsole } from "@/components/sections/hero-console";

export function HeroVisual() {
  return (
    <div className="fade-up delay-3 relative hidden h-120 select-none lg:block">
      {/* Radar rings */}
      <div aria-hidden="true" className="absolute right-4 top-1/2 size-105 -translate-y-1/2">
        {[0, 1, 2].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-cobalt/12"
            style={{ inset: `${ring * 56}px` }}
          />
        ))}
        <div className="radar-sweep absolute inset-0 rounded-full" />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
        {/* Blips on the radar */}
        <span className="pulse-dot absolute left-[24%] top-[30%] size-1.5 rounded-full bg-signal" />
        <span className="pulse-dot absolute left-[68%] top-[22%] size-1.5 rounded-full bg-coral" style={{ animationDelay: "0.7s" }} />
        <span className="pulse-dot absolute left-[74%] top-[64%] size-1.5 rounded-full bg-violet" style={{ animationDelay: "1.4s" }} />
      </div>

      {/* Main terminal card — cycles through one scene per project */}
      <HeroConsole scenes={consoleScenes} />

      {/* Floating chip — top right */}
      <div aria-hidden="true" className="float-y absolute right-10 top-10 flex items-center gap-2.5 rounded-xl border border-border bg-surface/85 px-4 py-3 shadow-(--shadow-lift) backdrop-blur-xl">
        <span className="grid size-8 place-items-center rounded-lg bg-signal/12 text-signal">
          <ShieldCheck className="size-4" />
        </span>
        <span>
          <span className="block text-xs font-bold text-ink">Threats blocked</span>
          <span className="block font-mono text-[0.62rem] font-semibold text-ink/45">
            proactive · 24/7
          </span>
        </span>
      </div>

      {/* Floating chip — bottom right */}
      <div aria-hidden="true" className="float-y-slow absolute bottom-12 right-16 flex items-center gap-2.5 rounded-xl border border-border bg-surface/85 px-4 py-3 shadow-(--shadow-lift) backdrop-blur-xl">
        <span className="grid size-8 place-items-center rounded-lg bg-violet/12 text-violet">
          <Zap className="size-4" />
        </span>
        <span>
          <span className="block text-xs font-bold text-ink">Agentic AI</span>
          <span className="block font-mono text-[0.62rem] font-semibold text-ink/45">
            thinks · adapts · heals
          </span>
        </span>
      </div>

      {/* Floating chip — bottom left of card */}
      <div aria-hidden="true" className="float-y absolute bottom-2 left-24 flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3.5 py-2 shadow-(--shadow-soft) backdrop-blur-xl" style={{ animationDelay: "0.6s" }}>
        <Activity className="size-3.5 text-cobalt" />
        <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink/55">
          anomaly detection
        </span>
      </div>
    </div>
  );
}
