import { describe, expect, it } from "vitest";
import {
  addHeadingIds,
  extractPlainTextExcerpt,
  processBlogHtml,
  sanitizeHtml,
} from "@/lib/blog-html";

describe("sanitizeHtml", () => {
  it("removes script tags", () => {
    expect(sanitizeHtml('<p>hi</p><script>alert("xss")</script>')).toBe("<p>hi</p>");
  });

  it("removes inline event handlers", () => {
    const out = sanitizeHtml('<img src="x" onerror="alert(1)">');
    expect(out).not.toContain("onerror");
  });

  it("removes javascript: URLs", () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">click</a>');
    expect(out).not.toContain("javascript:");
  });

  it("keeps formatting, classes, and data-URL images", () => {
    const html =
      '<h2>Title</h2><div class="callout callout-info">note</div><img src="data:image/png;base64,AAAA">';
    const out = sanitizeHtml(html);
    expect(out).toContain("<h2>Title</h2>");
    expect(out).toContain('class="callout callout-info"');
    expect(out).toContain("data:image/png;base64,AAAA");
  });

  it("keeps target/rel on links", () => {
    const out = sanitizeHtml('<a href="https://example.com" target="_blank" rel="noreferrer">x</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noreferrer"');
  });
});

describe("addHeadingIds", () => {
  it("adds slugified ids to h2-h4", () => {
    const out = addHeadingIds("<h2>First Steps</h2><h3>Deep Dive</h3>");
    expect(out).toContain('<h2 id="first-steps-0">First Steps</h2>');
    expect(out).toContain('<h3 id="deep-dive-1">Deep Dive</h3>');
  });

  it("leaves h1 untouched", () => {
    expect(addHeadingIds("<h1>Top</h1>")).toBe("<h1>Top</h1>");
  });

  it("disambiguates duplicate headings", () => {
    const out = addHeadingIds("<h2>Same</h2><h2>Same</h2>");
    expect(out).toContain('id="same-0"');
    expect(out).toContain('id="same-1"');
  });
});

describe("processBlogHtml", () => {
  it("sanitizes then adds heading ids", () => {
    const out = processBlogHtml('<h2>Safe</h2><script>alert(1)</script>');
    expect(out).toContain('<h2 id="safe-0">Safe</h2>');
    expect(out).not.toContain("script");
  });
});

describe("extractPlainTextExcerpt", () => {
  it("strips tags and collapses whitespace", () => {
    expect(extractPlainTextExcerpt("<p>Hello   <b>world</b></p>")).toBe("Hello world");
  });

  it("truncates at a word boundary with ellipsis", () => {
    const out = extractPlainTextExcerpt("<p>alpha beta gamma delta epsilon</p>", 15);
    expect(out).toBe("alpha beta…");
    expect(out.length).toBeLessThanOrEqual(16);
  });

  it("returns short text unchanged", () => {
    expect(extractPlainTextExcerpt("<p>short</p>")).toBe("short");
  });
});
