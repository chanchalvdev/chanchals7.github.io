import { describe, expect, it } from "vitest";
import { parseContributionsHtml } from "@/lib/github";

function cell(weekday: number, week: number, date: string) {
  return `<td tabindex="0" data-ix="${week}" style="width: 11px" data-date="${date}" id="contribution-day-component-${weekday}-${week}" data-level="1" role="gridcell" class="ContributionCalendar-day"></td>`;
}

function tip(weekday: number, week: number, text: string) {
  return `<tool-tip id="tooltip-x" for="contribution-day-component-${weekday}-${week}" popover="manual" class="sr-only">${text}</tool-tip>`;
}

describe("parseContributionsHtml", () => {
  it("builds weeks in column order with per-day counts", () => {
    const html = [
      `<h2 class="f4">\n  1,234\n  contributions\n  in the last year\n</h2>`,
      "<tr>",
      cell(0, 0, "2026-10-04"),
      cell(0, 1, "2026-10-11"),
      "</tr><tr>",
      cell(1, 0, "2026-10-05"),
      cell(1, 1, "2026-10-12"),
      "</tr>",
      tip(0, 0, "No contributions on October 4th."),
      tip(1, 0, "3 contributions on October 5th."),
      tip(0, 1, "1 contribution on October 11th."),
      tip(1, 1, "1,002 contributions on October 12th."),
    ].join("\n");

    const calendar = parseContributionsHtml(html);
    expect(calendar?.total).toBe(1234);
    expect(calendar?.weeks.map((w) => w.contributionDays.map((d) => [d.date, d.contributionCount]))).toEqual([
      [
        ["2026-10-04", 0],
        ["2026-10-05", 3],
      ],
      [
        ["2026-10-11", 1],
        ["2026-10-12", 1002],
      ],
    ]);
  });

  it("sums the days when the yearly heading is missing", () => {
    const html = [cell(0, 0, "2026-10-04"), tip(0, 0, "2 contributions on October 4th.")].join("");
    expect(parseContributionsHtml(html)?.total).toBe(2);
  });

  it("returns null when the markup has no calendar", () => {
    expect(parseContributionsHtml("<html><body>Not found</body></html>")).toBeNull();
  });
});
