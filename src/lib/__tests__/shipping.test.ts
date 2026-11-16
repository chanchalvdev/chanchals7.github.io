import { describe, expect, it } from "vitest";
import { commitsToShipEvents, describePullRequest, isStale, shortAge, toShipEvents } from "@/lib/shipping";

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

describe("open pull requests", () => {
  it("reads as work in progress, timed by the last update", () => {
    const [event] = toShipEvents([
      {
        title: "feat: phase 9 production shape",
        html_url: "https://github.com/u/threat-RAG/pull/9",
        repository_url: "https://api.github.com/repos/u/threat-RAG",
        closed_at: null,
        updated_at: "2026-11-14T06:35:55Z",
        state: "open",
        pull_request: { merged_at: null },
      },
    ]);
    expect(event).toMatchObject({ verb: "Building", subject: "phase 9 production shape", at: "2026-11-14T06:35:55Z" });
  });

  it("drops PRs closed without merging", () => {
    expect(
      toShipEvents([
        {
          title: "feature/abandoned",
          html_url: "https://github.com/u/r/pull/1",
          repository_url: "https://api.github.com/repos/u/r",
          closed_at: "2026-11-01T00:00:00Z",
          state: "closed",
          pull_request: { merged_at: null },
        },
      ]),
    ).toEqual([]);
  });
});

describe("commitsToShipEvents", () => {
  const commit = (repo: string, message: string, date: string, parents = 1) => ({
    sha: `${repo}-${date}-${message}`,
    html_url: `https://github.com/u/${repo}/commit/${message.length}`,
    parents: Array.from({ length: parents }),
    commit: { message, committer: { date } },
    repository: { name: repo, full_name: `u/${repo}`, private: false },
  });

  it("keeps direct pushes, collapsing a day's burst per repo to the newest", () => {
    const events = commitsToShipEvents(
      [
        commit("abalone-mini", "Add Part 1: training job", "2026-10-27T19:50:00Z"),
        commit("abalone-mini", "Add README with setup", "2026-10-27T19:54:55Z"),
      ],
      [],
    );
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ verb: "Committed", subject: "Add README with setup", repo: "abalone-mini" });
  });

  it("drops merge commits and commits a merged PR already covers", () => {
    const pr = toShipEvents([
      {
        title: "feat/agentops-case-study",
        html_url: "https://github.com/u/site/pull/41",
        repository_url: "https://api.github.com/repos/u/site",
        closed_at: "2026-10-30T08:47:23Z",
        pull_request: { merged_at: "2026-10-30T08:47:23Z" },
      },
    ]);
    const events = commitsToShipEvents(
      [
        commit("site", "Merge pull request #41", "2026-10-30T08:47:23Z", 2),
        commit("site", "projects: add AgentOps AI case study", "2026-10-30T08:47:09Z"),
      ],
      pr,
    );
    expect(events).toEqual([]);
  });
});
