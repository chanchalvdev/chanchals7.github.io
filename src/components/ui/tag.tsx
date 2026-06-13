import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "blue" | "green" | "coral" | "dark";
}) {
  const tones = {
    neutral: "border-ink/10 bg-page text-ink/56",
    blue:    "border-cobalt/18 bg-cobalt/8 text-cobalt",
    green:   "border-signal/20 bg-signal/8 text-signal",
    coral:   "border-violet/18 bg-violet/8 text-violet",
    dark:    "border-ink bg-ink text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[0.68rem] font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
