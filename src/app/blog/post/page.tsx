import type { Metadata } from "next";
import { BlogPostClient } from "@/components/blog/blog-post-client";

/**
 * Legacy query-param viewer (/blog/post/?id=slug). Every post it can render
 * also exists as a prerendered page at /blog/post/<slug>/, so this route stays
 * out of the index rather than competing with the canonical URL.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function BlogPostPage() {
  return <BlogPostClient />;
}
