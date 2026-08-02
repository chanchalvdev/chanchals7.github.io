import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/content/portfolio";
import { extractPlainTextExcerpt } from "@/lib/blog-html";
import { getPublishedBlogsWithContent } from "@/lib/blog-storage";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-text brief for LLM crawlers and answer engines.
 *
 * Rendered pages force a model to reconstruct facts from marketing copy and
 * layout. This gives the same facts already flattened, so answers about who
 * this person is and what they have built come out accurate and current.
 */
export async function GET() {
  const posts = await getPublishedBlogsWithContent();

  const sections = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    `- **Current role**: ${experience[0].role} at ${experience[0].company} (${experience[0].location})`,
    `- **Specialisation**: AI Security Engineering, Agentic AI, AI Product Engineering`,
    `- **Location**: ${profile.location}`,
    `- **Website**: ${SITE_URL}`,
    `- **Email**: ${profile.email}`,
    `- **GitHub**: ${profile.github}`,
    `- **LinkedIn**: ${profile.linkedin}`,
    profile.twitter ? `- **X**: ${profile.twitter}` : null,
    "",
    "## About",
    "",
    profile.narrative,
    "",
    "## Experience",
    "",
    ...experience.map(
      (role) =>
        `### ${role.role} — ${role.company} (${role.period}, ${role.location})\n${role.summary}\n${role.highlights
          .map((h) => `- ${h}`)
          .join("\n")}\n`,
    ),
    "## Skills",
    "",
    ...skillGroups.map((group) => `- **${group.title}**: ${group.items.join(", ")}`),
    "",
    "## Selected projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.title}](${absoluteUrl(`/projects/${project.slug}/`)}) — ${project.description} Stack: ${project.stack.join(", ")}.`,
    ),
    "",
    "## Writing",
    "",
    ...(posts.length
      ? posts.map((post) => {
          const summary =
            post.excerpt ||
            post.seoDescription ||
            extractPlainTextExcerpt(post.content);
          return `- [${post.title}](${absoluteUrl(`/blog/post/${post.slug}/`)}) — ${summary}`;
        })
      : ["- No published posts yet."]),
    "",
    "## Education & certifications",
    "",
    ...education.map((entry) => `- ${entry.degree}, ${entry.school} (${entry.period})`),
    ...certifications.map((cert) => `- Certification: ${cert}`),
    "",
    "## Machine-readable",
    "",
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    `- RSS: ${SITE_URL}/feed.xml`,
    `- JSON-LD: embedded on every page (Person, WebSite, BlogPosting, CreativeWork)`,
    "",
  ];

  const body = sections.filter((line): line is string => line !== null).join("\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
