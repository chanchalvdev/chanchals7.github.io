import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { GitHubGraph } from "@/components/sections/github-graph";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectList } from "@/components/sections/project-list";
import { SkillsSection } from "@/components/sections/skills-section";
import { projects } from "@/content/portfolio";
import { faqSchema, graph, profilePageSchema } from "@/lib/structured-data";

// No metadata export on purpose: the root layout's title, canonical ("/") and
// RSS alternate are already correct for this route. Redeclaring `alternates`
// here would replace the layout's wholesale — it merges per top-level key,
// not deeply — and silently drop the feed link.
export default function Home() {
  return (
    <>
      <JsonLd data={graph(profilePageSchema(), faqSchema())} />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectList projects={projects} />
        <GitHubGraph />
        <SkillsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
