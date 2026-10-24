import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Code2, ExternalLink, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { BackButton } from "@/components/ui/back-button";
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
  { key: "challenge", label: "The problem", icon: ShieldCheck },
  { key: "solution", label: "What I built", icon: Wrench },
  { key: "impact", label: "Why it matters", icon: Gauge },
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
        <article className="px-3 pb-6 pt-6 sm:px-6">
          <div className="mx-auto grid max-w-[82rem] gap-3.5 lg:grid-cols-12">
            <header className="tile p-7 sm:p-10 lg:col-span-12">
              <BackButton />
              <p className="bp-divider lbl mt-8 text-ink-faint">
                {project.category} case study · {project.year}
              </p>
              <h1 className="text-display mt-4 max-w-4xl text-4xl font-extrabold text-ink sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                {project.description}
              </p>
            </header>

            {project.coverImage ? (
              <div className="tile bg-[#0b1530] lg:col-span-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.coverImage} alt={`${project.title} — title`} className="w-full" />
              </div>
            ) : null}

            <div className={`grid content-start gap-3.5 ${project.coverImage ? "lg:col-span-4" : "sm:grid-cols-3 lg:col-span-12"}`}>
              {project.metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`tile p-6 ${["tile-lime", "tile-lav", "tile-sky"][index % 3]}`}
                >
                  <p className="text-4xl font-extrabold tracking-tight">{metric.value}</p>
                  <p className="lbl on-tile-soft mt-1.5">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="grid content-start gap-3.5 lg:col-span-8">
              {narrativeSections.map(({ key, label, icon: Icon }) => (
                <section key={key} className="tile p-7 sm:p-8">
                  <h2 className="lbl flex items-center gap-2 text-ink-faint">
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </h2>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">{project[key]}</p>
                </section>
              ))}

              <section className="tile tile-ink p-7 sm:p-8">
                <h2 className="lbl on-tile-soft">Results</h2>
                <ul className="mt-4 grid gap-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex gap-3 text-[1.02rem] leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--tile-lime-bg)]" aria-hidden="true" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {project.detailImage ? (
                <div className="tile bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.detailImage} alt={`${project.title} — architecture`} className="w-full rounded-[1.25rem]" />
                </div>
              ) : null}
            </div>

            <aside className="grid h-fit gap-3.5 lg:sticky lg:top-24 lg:col-span-4">
              <div className="tile p-6">
                <p className="lbl text-ink-faint">Stack</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="tile tile-lime p-6">
                <p className="lbl on-tile-soft">Links</p>
                <div className="mt-4 grid gap-2">
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--tile-lime-fg)] px-4 text-sm font-semibold text-[var(--tile-lime-bg)] transition hover:opacity-90"
                    >
                      <Code2 className="size-4" aria-hidden="true" />
                      View on GitHub
                    </a>
                  ) : null}
                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black/10 px-4 text-sm font-semibold transition hover:bg-black/15"
                    >
                      Request a demo
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <p className="on-tile-soft mt-4 text-sm leading-6">
                  Some production details are summarized to respect employer and client confidentiality.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
