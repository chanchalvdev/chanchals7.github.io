/**
 * Canonical site identity. Everything that emits an absolute URL — metadata,
 * sitemap, robots, RSS, JSON-LD — must read the origin from here so the site
 * can never again ship canonicals pointing at a domain that does not resolve.
 */
export const SITE_URL = "https://chanchalverma.dev";

export const SITE_NAME = "Chanchal Verma";

export const SITE_TAGLINE =
  "AI Security Engineer | AI Product Engineering";

export const SITE_DESCRIPTION =
  "Chanchal Verma is an AI Security Engineer in Abu Dhabi building AI-powered security systems and agentic AI platforms. Senior Full Stack Engineer with 5+ years across Go, Node.js, React, Next.js, Kubernetes, and cloud security.";

/** Resolve a site-relative path to an absolute URL. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
