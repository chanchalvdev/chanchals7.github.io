/**
 * JSON-LD graph builders.
 *
 * Traditional search (SEO) uses these for rich results; answer engines
 * (GEO/AEO — Google AI Overviews, ChatGPT, Perplexity, Claude) lean on them
 * even harder, because a typed graph is far cheaper to extract facts from than
 * prose. Every node carries a stable `@id` so the graph cross-references
 * itself instead of repeating the same entity on every page.
 */
import {
  education,
  experience,
  profile,
  skillGroups,
  type Project,
} from "@/content/portfolio";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const OG_IMAGE = absoluteUrl("/opengraph-image.png");

/** Flattened skill list — the `knowsAbout` claims an answer engine can cite. */
const knowsAbout = [
  "AI Security Engineering",
  "Agentic AI",
  "Large Language Models",
  "Cybersecurity",
  "Threat Detection",
  "Full Stack Engineering",
  "Cloud Architecture",
  ...skillGroups.flatMap((group) => group.items),
];

export function personSchema() {
  const [current] = experience;

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    givenName: "Chanchal",
    familyName: "Verma",
    url: SITE_URL,
    image: OG_IMAGE,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    jobTitle: "AI Security Engineer",
    description: profile.summary,
    disambiguatingDescription: SITE_DESCRIPTION,
    knowsAbout: Array.from(new Set(knowsAbout)),
    knowsLanguage: ["English", "Hindi", "Arabic"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    worksFor: {
      "@type": "Organization",
      name: current.company,
      description: current.summary,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Security Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Abu Dhabi",
      },
      skills: knowsAbout.slice(0, 20).join(", "),
    },
    alumniOf: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.school,
    })),
    sameAs: [
      profile.github,
      profile.linkedin,
      profile.twitter,
      profile.blog,
    ].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    copyrightHolder: { "@id": PERSON_ID },
  };
}

/**
 * Marks the homepage as the authoritative record *for* the person, rather
 * than just another page that mentions them.
 */
export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${SITE_NAME} — AI Security Engineer`,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    primaryImageOfPage: OG_IMAGE,
  };
}

/**
 * Q&A pairs mirroring how people actually query an answer engine about a
 * person ("who is X", "what does X do", "can I hire X"). Answers stay short
 * and self-contained so they can be quoted without surrounding context.
 */
export function faqSchema() {
  const qa: Array<[string, string]> = [
    [
      "Who is Chanchal Verma?",
      "Chanchal Verma is an AI Security Engineer based in Abu Dhabi, UAE, and a Senior Full Stack Engineer with over 5 years of experience building cloud-native systems. He currently leads frontend development for AI-powered security products at CPX and builds agentic AI systems that detect and respond to cyber threats automatically.",
    ],
    [
      "What does Chanchal Verma do?",
      "He designs and builds AI-native security software end to end: data-rich interfaces for SOC, Threat Intelligence, and Threat Hunting teams; backend platforms in Go and Node.js; and autonomous LLM agents for anomaly detection and proactive defence against malware and phishing.",
    ],
    [
      "What technologies does Chanchal Verma work with?",
      "React, Next.js and TypeScript on the frontend; Go, Node.js, NestJS, GraphQL and gRPC on the backend; Agentic AI, LLM integration, RAG, Qdrant and Ollama for AI systems; and AWS, Azure, GCP, Kubernetes, Terraform and Keycloak across cloud and security.",
    ],
    [
      "Where is Chanchal Verma based?",
      "Abu Dhabi, United Arab Emirates. He has worked with teams across the UAE, Germany, India, and the United States.",
    ],
    [
      "How can I contact or hire Chanchal Verma?",
      `Email ${profile.email} or reach out on LinkedIn at ${profile.linkedin}. He is open to senior engineering, AI security, and agentic AI product roles as well as consulting engagements.`,
    ],
  ];

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: qa.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function projectSchema(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}/`);

  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.title,
    headline: project.title,
    description: project.description,
    abstract: project.impact,
    dateCreated: project.year,
    genre: project.category,
    keywords: project.stack.join(", "),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(project.coverImage ? { image: absoluteUrl(project.coverImage) } : {}),
  };
}

type BlogPostingInput = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  coverImage?: string;
  wordCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export function blogPostingSchema(post: BlogPostingInput) {
  const url = absoluteUrl(`/blog/post/${post.slug}/`);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.wordCount,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    inLanguage: "en",
    image: post.coverImage ? absoluteUrl(post.coverImage) : OG_IMAGE,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** Wrap nodes into a single `@graph` document — one script tag per page. */
export function graph(...nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
