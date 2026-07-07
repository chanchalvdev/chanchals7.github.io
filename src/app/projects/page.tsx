import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers3 } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProjectList } from "@/components/sections/project-list";
import { projects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Chanchal Verma across security products, cloud platforms, backend systems, and frontend architecture.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-band px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink/58 transition hover:text-cobalt"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back home
            </Link>
            <div className="mt-10 max-w-4xl">
              <p className="text-kicker text-cobalt">Work archive</p>
              <h1 className="mt-4 text-5xl font-semibold leading-none text-ink sm:text-6xl">
                Case studies for technical products and systems.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/62">
                A focused archive of shipped product work across security,
                cloud governance, backend delivery, and frontend systems.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-surface px-4 py-3 text-sm font-semibold text-ink/58">
                <Layers3 className="size-4 text-coral" aria-hidden="true" />
                Filter and sort by the product context that matters.
              </div>
            </div>
          </div>
        </section>
        <ProjectList projects={projects} />
      </main>
      <Footer />
    </>
  );
}
