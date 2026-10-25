import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { ProjectList } from "@/components/sections/project-list";
import { projects } from "@/content/portfolio";
import { absoluteUrl } from "@/lib/site";
import { PERSON_ID, breadcrumbSchema, graph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Chanchal Verma across agentic AI systems, LLM and RAG products, secure AI platforms, backend systems, and frontend architecture.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Projects | Chanchal Verma",
    description:
      "Case studies across agentic AI systems, LLM products, secure AI platforms, and frontend architecture.",
    url: absoluteUrl("/projects/"),
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/projects/")}#collection`,
            url: absoluteUrl("/projects/"),
            name: "Projects — Chanchal Verma",
            description: metadata.description,
            about: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: projects.length,
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.title,
                url: absoluteUrl(`/projects/${project.slug}/`),
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
          ]),
        )}
      />
      <Navbar />
      <main>
        <section className="px-3 pt-6 sm:px-6">
          <div className="tile mx-auto max-w-[82rem] p-7 sm:p-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back home
            </Link>
            <p className="bp-divider lbl mt-8 text-ink-faint">Work archive</p>
            <h1 className="text-display mt-4 max-w-4xl text-4xl font-extrabold text-ink sm:text-6xl">
              Agents and platforms, <span className="serif-accent">shipped</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Case studies of AI agents, RAG pipelines, and the backends and interfaces around them —
              built end to end and run in production.
            </p>
          </div>
        </section>
        <ProjectList projects={projects} title="All projects" />
      </main>
      <Footer />
    </>
  );
}
