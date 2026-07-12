import { describe, expect, it } from "vitest";
import {
  calculateReadTime,
  countWords,
  formatDate,
  generateId,
  generateSlug,
} from "@/lib/blog-storage";

describe("generateSlug", () => {
  it("lowercases and hyphenates", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });

  it("strips special characters", () => {
    expect(generateSlug("What's New in Next.js 15?!")).toBe("whats-new-in-nextjs-15");
  });

  it("collapses repeated separators and trims edges", () => {
    expect(generateSlug("  --Multiple   Spaces--  ")).toBe("multiple-spaces");
  });

  it("returns empty string for symbol-only input", () => {
    expect(generateSlug("!!!")).toBe("");
  });
});

describe("countWords", () => {
  it("counts words in plain text", () => {
    expect(countWords("one two three")).toBe(3);
  });

  it("ignores HTML tags", () => {
    expect(countWords("<p>one <strong>two</strong></p><p>three</p>")).toBe(3);
  });

  it("returns 0 for empty content", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("<p></p>")).toBe(0);
  });
});

describe("calculateReadTime", () => {
  it("has a 1 minute floor", () => {
    expect(calculateReadTime("<p>short</p>")).toBe("1 min read");
  });

  it("rounds up at 200 words per minute", () => {
    const words = Array.from({ length: 401 }, (_, i) => `w${i}`).join(" ");
    expect(calculateReadTime(`<p>${words}</p>`)).toBe("3 min read");
  });
});

describe("generateId", () => {
  it("generates distinct ids", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe("formatDate", () => {
  it("formats ISO dates in long US style", () => {
    expect(formatDate("2026-07-04T12:00:00.000Z")).toMatch(/July \d{1,2}, 2026/);
  });
});
