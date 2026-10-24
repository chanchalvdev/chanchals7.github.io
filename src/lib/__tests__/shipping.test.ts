import { describe, expect, it } from "vitest";
import { describePullRequest, isStale, shortAge, toShipEvents } from "@/lib/shipping";

describe("describePullRequest", () => {
  it("turns branch-style titles into readable lines", () => {
    expect(describePullRequest("feature/soc-metrics-dashboard")).toEqual({
      verb: "Shipped",
      subject: "SOC metrics dashboard",
    });
    expect(describePullRequest("fix/security-deps")).toEqual({ verb: "Fixed", subject: "security deps" });
  });

  it("keeps mixed-case terms readable", () => {
    expect(describePullRequest("feature/llmops-evals")).toEqual({ verb: "Shipped", subject: "LLMOps evals" });
  });

  it("understands conventional-commit prefixes", () => {
    expect(describePullRequest("feat(api): add IOC watchlists")).toEqual({
      verb: "Shipped",
      subject: "add IOC watchlists",
    });
  });

  it("hides housekeeping", () => {
    expect(describePullRequest("chore/phase-11-plan-and-cleanup")).toBeNull();
    expect(describePullRequest("docs/rename-to-casewright")).toBeNull();
    expect(describePullRequest("ci: bump node")).toBeNull();
  });

  it("keeps plain sentences as merges", () => {
    expect(describePullRequest("Add retries to the worker")).toEqual({
      verb: "Merged",
      subject: "Add retries to the worker",
    });
  });
});

describe("shortAge", () => {
  const now = Date.parse("2026-10-24T12:00:00Z");
  it("formats recent ages compactly", () => {
    expect(shortAge("2026-10-24T11:30:00Z", now)).toBe("30m");
    expect(shortAge("2026-10-24T09:00:00Z", now)).toBe("3h");
    expect(shortAge("2026-10-22T12:00:00Z", now)).toBe("2d");
  });
  it("drops the age once it would read as stale", () => {
    expect(shortAge("2026-10-01T12:00:00Z", now)).toBeNull();
  });
});

describe("toShipEvents / isStale", () => {
  const item = (title: string, mergedAt: string) => ({
    title,
    html_url: `https://github.com/u/r/pull/${title.length}`,
    repository_url: "https://api.github.com/repos/u/casewright",
    closed_at: mergedAt,
    pull_request: { merged_at: mergedAt },
  });

  it("filters, sorts newest first, and names the repo", () => {
    const events = toShipEvents([
      item("feature/older", "2026-10-01T00:00:00Z"),
      item("chore/cleanup", "2026-10-23T00:00:00Z"),
      item("feature/newer", "2026-10-20T00:00:00Z"),
    ]);
    expect(events.map((e) => e.subject)).toEqual(["newer", "older"]);
    expect(events[0].repo).toBe("casewright");
  });

  it("reports staleness", () => {
    const now = Date.parse("2026-10-24T00:00:00Z");
    expect(isStale([], now)).toBe(true);
    expect(isStale(toShipEvents([item("feature/x", "2026-10-20T00:00:00Z")]), now)).toBe(false);
    expect(isStale(toShipEvents([item("feature/x", "2026-08-01T00:00:00Z")]), now)).toBe(true);
  });
});
