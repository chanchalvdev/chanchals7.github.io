"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A tiny tear-off calendar page showing the visitor's own date — so the
 * button reads as "pick a day" at a glance. The date is filled in after
 * mount: the page is statically exported, so a build-time date would be stale.
 */
function CalendarPage() {
  const [today, setToday] = useState<{ weekday: string; day: number } | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday({
      weekday: now.toLocaleDateString("en-US", { weekday: "short" }),
      day: now.getDate(),
    });
  }, []);

  return (
    <span className="cal-page" aria-hidden="true">
      <span className="cal-page-head">{today?.weekday ?? " "}</span>
      <span className="cal-page-day">{today?.day ?? " "}</span>
      <span className="cal-page-dot" />
    </span>
  );
}

export function BookCallButton({
  className,
  onClick,
  block = false,
}: {
  className?: string;
  onClick?: () => void;
  /** Full-width variant for the mobile menu. */
  block?: boolean;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      aria-label="Book a 15-minute call (opens in a new tab)"
      className={cn("book-call group", block && "book-call-block", className)}
    >
      <CalendarPage />
      <span className={cn("font-semibold", !block && "hidden sm:inline")}>Book a call</span>
      {block ? (
        <span className="ml-auto font-mono text-xs opacity-70">15 min · Google Meet</span>
      ) : null}
      <ArrowUpRight className="book-call-arrow size-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
