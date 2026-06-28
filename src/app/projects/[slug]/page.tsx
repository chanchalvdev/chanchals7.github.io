import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Code2, ExternalLink, Gauge, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BackButton } from "@/components/ui/back-button";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/content/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectCaseStudy({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main>
        <article className="px-5 py-12 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <BackButton />

            <header className="mt-10 border-b border-ink/10 pb-10">
              <p className="text-kicker text-cobalt">
                {project.category} case study / {project.year}
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-ink/66">
                {project.description}
              </p>
              {project.coverImage && (
                <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10 shadow-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={`${project.title} — title`}
                    className="w-full"
                  />
                </div>
              )}
            </header>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
                  <p className="text-3xl font-semibold text-ink">{metric.value}</p>
                  <p className="mt-1 text-sm font-semibold text-ink/48">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="space-y-6">
                <section className="rounded-lg border border-cobalt/12 bg-cobalt/4 p-6">
                  <div className="flex items-center gap-2">
                    <Gauge className="size-5 text-cobalt" aria-hidden="true" />
                    <h2 className="text-2xl font-semibold text-ink">Product impact</h2>
                  </div>
                  <p className="mt-4 leading-8 text-ink/66">{project.impact}</p>
                </section>
                <section className="rounded-lg border border-ink/10 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-5 text-coral" aria-hidden="true" />
                    <h2 className="text-2xl font-semibold text-ink">Challenge</h2>
                  </div>
                  <p className="mt-4 leading-8 text-ink/66">{project.challenge}</p>
                </section>
                <section className="rounded-lg border border-ink/10 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <Gauge className="size-5 text-cobalt" aria-hidden="true" />
                    <h2 className="text-2xl font-semibold text-ink">Approach</h2>
                  </div>
                  <p className="mt-4 leading-8 text-ink/66">{project.solution}</p>
                </section>
                <section className="rounded-lg border border-ink/10 bg-white p-6">
                  <h2 className="text-2xl font-semibold text-ink">Results</h2>
                  <ul className="mt-5 grid gap-3 leading-8 text-ink/66">
                    {project.results.map((result) => (
                      <li key={result} className="flex gap-3">
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-cobalt" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                {project.detailImage && (
                  <div className="overflow-hidden rounded-xl border border-ink/10 shadow-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.detailImage}
                      alt={`${project.title} — architecture`}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              <aside className="h-fit rounded-lg border border-ink/10 bg-ink p-5 text-white">
                <h2 className="text-xl font-semibold">Project links</h2>
                <div className="mt-5 grid gap-3">
                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-ink"
                    >
                      Demo request
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/12 px-4 text-sm font-bold text-white"
                    >
                      <Code2 className="size-4" aria-hidden="true" />
                      GitHub
                    </a>
                  ) : null}
                </div>
                <p className="mt-5 text-sm leading-6 text-white/52">
                  Some production details are summarized to respect employer and client confidentiality.
                </p>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
