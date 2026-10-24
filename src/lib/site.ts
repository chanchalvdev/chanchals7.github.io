/**
 * Canonical site identity. Everything that emits an absolute URL — metadata,
 * sitemap, robots, RSS, JSON-LD — must read the origin from here so the site
 * can never again ship canonicals pointing at a domain that does not resolve.
 */
export const SITE_URL = "https://chanchalverma.dev";

export const SITE_NAME = "Chanchal Verma";

export const SITE_TAGLINE =
  "AI Engineer | Forward Deployed Engineer";

export const SITE_DESCRIPTION =
  "Chanchal Verma is an AI Engineer and Forward Deployed Engineer in Abu Dhabi who builds production AI agents end to end — and keeps them secure. Senior Full Stack AI Engineer with 5+ years across agentic AI, LLM apps, Go, Node.js, React, Kubernetes, and cloud.";

/** Resolve a site-relative path to an absolute URL. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
