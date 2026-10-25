import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ShippingStrip } from "@/components/layout/shipping-strip";
import { JsonLd } from "@/components/seo/json-ld";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroBento } from "@/components/sections/hero-bento";
import { ProjectList } from "@/components/sections/project-list";
import { SkillsSection } from "@/components/sections/skills-section";
import { githubActivity, projects } from "@/content/portfolio";
import { getPublishedBlogs } from "@/lib/blog-storage";
import { fetchGitHubContributions, fetchPublicContributions } from "@/lib/github";
import { fetchShipEvents, type ShipEvent } from "@/lib/shipping";
import { faqSchema, graph, profilePageSchema } from "@/lib/structured-data";

// The hero features this project; the work grid lists the rest.
const FLAGSHIP_SLUG = "go-siem-agent-llm-classifier";

// Build-time snapshots. Either can fail (no token locally, rate limits) —
// the page must still build, so each degrades to "nothing to show".
async function loadContributions() {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const { data } = await fetchGitHubContributions({ username: githubActivity.username, token });
      const calendar = data.user.contributionsCollection.contributionCalendar;
      return { weeks: calendar.weeks, total: calendar.totalContributions };
    } catch (err) {
      console.warn("GitHub GraphQL contributions unavailable, trying the public page:", err);
    }
  }
  // No token (local builds) or a token without the right scope: the public
  // contributions page carries the same calendar.
  try {
    return await fetchPublicContributions(githubActivity.username);
  } catch (err) {
    console.warn("GitHub contributions unavailable:", err);
    return null;
  }
}

async function loadShipping(): Promise<ShipEvent[]> {
  try {
    return await fetchShipEvents(githubActivity.username);
  } catch (err) {
    console.warn("Shipping feed unavailable at build:", err);
    return [];
  }
}

// No metadata export on purpose: the root layout's title, canonical ("/") and
// RSS alternate are already correct for this route. Redeclaring `alternates`
// here would replace the layout's wholesale — it merges per top-level key,
// not deeply — and silently drop the feed link.
export default async function Home() {
  const [contributions, shipping, posts] = await Promise.all([
    loadContributions(),
    loadShipping(),
    getPublishedBlogs(),
  ]);

  return (
    <>
      <JsonLd data={graph(profilePageSchema(), faqSchema())} />
      <Navbar />
      <div className="px-3 sm:px-6">
        <ShippingStrip initial={shipping} />
      </div>
      <main>
        <HeroBento
          flagshipSlug={FLAGSHIP_SLUG}
          contributions={contributions}
          latestShip={shipping[0]}
          posts={posts}
        />
        <ProjectList
          projects={projects.filter((project) => project.slug !== FLAGSHIP_SLUG)}
          title="More things I've built"
          continued
        />
        <ExperienceSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}
