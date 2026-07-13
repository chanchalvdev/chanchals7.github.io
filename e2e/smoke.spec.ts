import { test, expect } from "@playwright/test";

test.describe("site smoke", () => {
  test("home page renders hero and nav", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Chanchal Verma");
    await expect(page.getByRole("banner").getByRole("link", { name: "Writing" })).toBeVisible();
  });

  test("navigates to a project case study and back", async ({ page }) => {
    await page.goto("/projects/");
    const firstCase = page.locator('a[href^="/projects/"]').first();
    await firstCase.click();
    await expect(page).toHaveURL(/\/projects\/[a-z0-9-]+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("link", { name: /back to projects/i }).click();
    await expect(page).toHaveURL(/\/#projects$/);
  });

  test("unknown URL shows the styled 404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist/");
    await expect(page.getByText("Page not found")).toBeVisible();
    await page.getByRole("link", { name: /back home/i }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Chanchal Verma");
  });
});

test.describe("blog", () => {
  test("blog listing loads and posts render", async ({ page }) => {
    await page.goto("/blog/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Posts come from Supabase — without env/network the empty state is valid
    const readLinks = page.getByRole("link", { name: /read post/i });
    const emptyState = page.getByText(/no posts/i);
    await expect(readLinks.first().or(emptyState)).toBeVisible({ timeout: 15_000 });

    if ((await readLinks.count()) === 0) {
      test.skip(true, "No published posts available (Supabase not configured)");
    }

    // Click through to a post and verify the article renders
    await readLinks.first().click();
    await expect(page).toHaveURL(/\/blog\/post\/[a-z0-9-]+\/?/);
    await expect(page.getByRole("article").getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.locator(".prose-blog")).toBeVisible();

    // Table of contents (from sanitized heading IDs) when the post has headings
    const tocLinks = page.locator('aside a[href^="#"]');
    if ((await tocLinks.count()) > 0) {
      await tocLinks.first().click();
      await expect(page).toHaveURL(/#.+/);
    }
  });

  test("query-param fallback viewer renders a post", async ({ page }) => {
    await page.goto("/blog/");
    const readLinks = page.getByRole("link", { name: /read post/i });
    const emptyState = page.getByText(/no posts/i);
    await expect(readLinks.first().or(emptyState)).toBeVisible({ timeout: 15_000 });
    if ((await readLinks.count()) === 0) {
      test.skip(true, "No published posts available (Supabase not configured)");
    }

    const href = await readLinks.first().getAttribute("href");
    const slug = href!.match(/\/blog\/post\/([^/]+)/)![1];
    await page.goto(`/blog/post/?id=${slug}`);
    await expect(page.getByRole("article").getByRole("heading", { level: 1 }).first()).toBeVisible();
  });
});

test.describe("admin", () => {
  test("admin panel redirects unauthenticated visitors to login", async ({ page }) => {
    await page.goto("/admin/");
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 15_000 });
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });
});
