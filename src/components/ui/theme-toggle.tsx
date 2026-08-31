"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  const isNight = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isNight}
      aria-label={`Switch to ${isNight ? "day" : "night"} mode`}
      className="group inline-flex items-center gap-2.5"
    >
      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300",
          "border-ink/20 bg-ink/5 group-hover:border-ink/35",
        )}
      >
        <span
          className={cn(
            "inline-block size-4 translate-x-1 rounded-full bg-ink shadow-sm transition-transform duration-300 ease-out",
            isNight && "translate-x-6",
          )}
        />
      </span>
      <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ink/50 transition-colors duration-200 group-hover:text-ink/80">
        {isNight ? "Night" : "Day"}
      </span>
    </button>
  );
}
