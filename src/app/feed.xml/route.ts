import { extractPlainTextExcerpt } from "@/lib/blog-html";
import { getPublishedBlogsWithContent } from "@/lib/blog-storage";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { profile } from "@/content/portfolio";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPublishedBlogsWithContent();
  const updated = posts[0]?.updatedAt ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/post/${post.slug}/`);
      const description =
        post.seoDescription || post.excerpt || extractPlainTextExcerpt(post.content);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${new Date(post.publishedAt ?? post.createdAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(profile.name)}</dc:creator>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Writing</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
