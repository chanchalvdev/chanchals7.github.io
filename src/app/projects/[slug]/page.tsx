import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Code2, ExternalLink, Gauge, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { BackButton } from "@/components/ui/back-button";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/content/portfolio";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, graph, projectSchema } from "@/lib/structured-data";

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

  const url = absoluteUrl(`/projects/${project.slug}/`);

  return {
    title: project.title,
    description: project.description,
    keywords: project.stack,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.title} | Chanchal Verma`,
      description: project.description,
      url,
      type: "article",
      ...(project.coverImage ? { images: [{ url: project.coverImage }] } : {}),
    },
  };
}

const narrativeSections = [
  { key: "impact", label: "Product impact", icon: Gauge },
  { key: "challenge", label: "Challenge", icon: ShieldCheck },
  { key: "solution", label: "Approach", icon: Gauge },
] as const;

export default async function ProjectCaseStudy({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
            { name: project.title, path: `/projects/${project.slug}/` },
          ]),
        )}
      />
      <Navbar />
      <main>
        <article className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <BackButton />

            <header className="mt-10 border-b border-border pb-10">
              <p className="bp-divider font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
                {project.category} case study · {project.year}
              </p>
              <h1 className="text-display mt-5 max-w-4xl text-5xl font-bold leading-[1.0] text-ink sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-ink/70">
                {project.description}
              </p>
              {project.coverImage ? (
                <div className="mt-10 overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={`${project.title} — title`}
                    className="w-full"
                  />
                </div>
              ) : null}
            </header>

            {/* Performance ruler */}
            <div className="mt-10">
              <div className="dim-ruler" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="dim-cell px-4 pb-0 pt-[0.9rem] first:pl-0 sm:px-6">
                    <p className="text-display text-2xl font-bold text-ink">{metric.value}</p>
                    <p className="mt-0.5 font-mono text-[0.63rem] font-semibold uppercase tracking-[0.04em] text-ink/45">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
              <div>
                {narrativeSections.map(({ key, label, icon: Icon }, index) => (
                  <section key={key} className="grid grid-cols-[2.75rem_1fr] gap-5 border-t border-dashed border-border py-6 first:border-t-0">
                    <span className="part-badge size-8 text-xs">{index + 1}</span>
                    <div>
                      <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.05em] text-ink">
                        <Icon className="size-4 text-cobalt" aria-hidden="true" />
                        {label}
                      </h2>
                      <p className="mt-2.5 max-w-2xl text-base leading-8 text-ink/65">
                        {project[key]}
                      </p>
                    </div>
                  </section>
                ))}

                <section className="border-t border-dashed border-border py-6">
                  <div className="grid grid-cols-[2.75rem_1fr] gap-5">
                    <span className="part-badge size-8 text-xs">4</span>
                    <div>
                      <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-ink">
                        Results
                      </h2>
                      <ul className="mt-3 grid max-w-2xl gap-2.5">
                        {project.results.map((result) => (
                          <li key={result} className="flex gap-2.5 text-base leading-7 text-ink/65">
                            <span className="mt-2.5 size-1 shrink-0 bg-cobalt" aria-hidden="true" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {project.detailImage ? (
                  <div className="mt-6 overflow-hidden border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.detailImage}
                      alt={`${project.title} — architecture`}
                      className="w-full"
                    />
                  </div>
                ) : null}
              </div>

              <aside className="h-fit border-[1.5px] border-ink bg-ink p-5 text-page">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-page/50">
                  Project Links
                </p>
                <div className="mt-4 grid gap-3">
                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      className="inline-flex h-11 items-center justify-center gap-2 border border-page bg-page px-4 font-mono text-[0.78rem] font-bold uppercase tracking-[0.04em] text-ink"
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
                      className="inline-flex h-11 items-center justify-center gap-2 border border-page/25 px-4 font-mono text-[0.78rem] font-bold uppercase tracking-[0.04em] text-page transition hover:border-page"
                    >
                      <Code2 className="size-4" aria-hidden="true" />
                      GitHub
                    </a>
                  ) : null}
                </div>
                <p className="mt-5 text-sm leading-6 text-page/55">
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
