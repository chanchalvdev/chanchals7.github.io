"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/portfolio";
import { fetchShipEvents, isStale, shortAge, type ShipEvent } from "@/lib/shipping";

const CACHE_KEY = "shipping:v1";
const CACHE_MS = 10 * 60 * 1000;
const GITHUB_USER = profile.github.split("/").filter(Boolean).pop() ?? "";

function readCache(): ShipEvent[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, events } = JSON.parse(raw) as { at: number; events: ShipEvent[] };
    return Date.now() - at < CACHE_MS ? events : null;
  } catch {
    return null;
  }
}

function writeCache(events: ShipEvent[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), events }));
  } catch {
    // Storage blocked — we'll just refetch next time.
  }
}

/**
 * Live strip of recently merged public PRs. Renders the build-time snapshot
 * immediately, then refreshes from GitHub in the browser so it stays current
 * between deploys. Hides itself when there's nothing recent to show.
 */
export function ShippingStrip({ initial }: { initial: ShipEvent[] }) {
  const [events, setEvents] = useState(initial);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const cached = readCache();
    if (cached) {
      setEvents(cached);
      return;
    }
    const controller = new AbortController();
    fetchShipEvents(GITHUB_USER, { signal: controller.signal })
      .then((fresh) => {
        if (fresh.length) {
          setEvents(fresh);
          writeCache(fresh);
        }
      })
      .catch(() => {
        // Rate-limited or offline — keep the build-time snapshot.
      });
    return () => controller.abort();
  }, []);

  if (isStale(events, now ?? Date.now())) return null;

  const items = events.map((event) => {
    const age = now ? shortAge(event.mergedAt, now) : null;
    return (
      <a
        key={event.url}
        href={event.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex shrink-0 items-baseline gap-1.5 text-sm text-ink-soft transition hover:text-ink"
      >
        {event.verb} <b className="font-semibold text-ink">{event.subject}</b>
        <span className="font-mono text-xs text-ink-faint">
          · {event.repo}
          {age ? ` · ${age}` : ""}
        </span>
      </a>
    );
  });

  return (
    <div className="mx-auto mt-3 flex max-w-[82rem] items-center gap-3 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-0">
      <span className="lbl flex shrink-0 items-center gap-2 rounded-full bg-[var(--tile-ink-bg)] px-3 py-1.5 text-[var(--tile-lime-bg)]">
        <span className="live-dot pulse-dot" aria-hidden="true" />
        Shipping
      </span>
      <div className="marquee min-w-0 flex-1" aria-label="Recently merged pull requests">
        <div className="marquee-track !gap-8 !pr-8">{items}</div>
        <div className="marquee-track !gap-8 !pr-8" aria-hidden="true" inert>
          {items}
        </div>
      </div>
    </div>
  );
}
