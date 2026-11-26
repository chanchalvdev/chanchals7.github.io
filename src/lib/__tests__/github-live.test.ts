import { describe, expect, it } from "vitest";
import { isContributionCalendar } from "@/lib/github-live";

describe("isContributionCalendar", () => {
  it("accepts the edge function's shape", () => {
    const body = { total: 3, weeks: [{ contributionDays: [{ date: "2026-11-26", contributionCount: 3, color: "", level: 2 }] }] };
    expect(isContributionCalendar(body)).toBe(true);
  });

  it("rejects errors and empty calendars", () => {
    expect(isContributionCalendar({ error: "GitHub GraphQL 401" })).toBe(false);
    expect(isContributionCalendar({ total: 0, weeks: [] })).toBe(false);
    expect(isContributionCalendar(null)).toBe(false);
  });
});
