"use client";

import { useEffect, useState } from "react";

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
    <div className="flex items-center gap-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-ink/55">
      <span>{isNight ? "Night" : "Day"}</span>
      <button
        type="button"
        onClick={toggle}
        role="switch"
        aria-checked={isNight}
        aria-label={`Switch to ${isNight ? "day" : "night"} mode`}
        className="relative h-[1.55rem] w-[3.1rem] shrink-0 cursor-pointer border-[1.5px] border-ink bg-muted p-0"
      >
        <span
          className="absolute top-px bottom-px left-px block w-[1.2rem] bg-ink transition-transform duration-200 ease-out"
          style={{ transform: isNight ? "translateX(1.45rem)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}
