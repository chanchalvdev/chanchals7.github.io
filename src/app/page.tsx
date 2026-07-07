import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { GitHubGraph } from "@/components/sections/github-graph";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectList } from "@/components/sections/project-list";
import { SkillsSection } from "@/components/sections/skills-section";
import { projects } from "@/content/portfolio";

export default function Home() {
  return (
    <>
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
