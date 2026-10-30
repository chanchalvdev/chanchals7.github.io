import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AskMe } from "@/components/chat/ask-me";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/content/portfolio";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import { graph, personSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
});

const TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

// Derived from the profile so a handle change in one place propagates here.
const GITHUB_HANDLE = profile.github.split("/").filter(Boolean).pop() ?? "";
const X_HANDLE = `@${profile.twitter?.split("/").filter(Boolean).pop() ?? ""}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [
    "Chanchal Verma",
    "AI Engineer",
    "Forward Deployed Engineer",
    "FDE",
    "Agentic AI",
    "LLM Engineer",
    "RAG",
    "Golang",
    "Node.js",
    "React",
    "Next.js",
    "Kubernetes",
    "UI/UX",
    "DevOps",
    "Cloud",
    "AI Security",
    "AI Security Engineer",
    "Abu Dhabi software engineer",
    "Agentic AI Engineer",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  // Search Console ownership token. Public by design — it only proves control
  // of this site and grants nothing on its own. Kept alongside the HTML-file
  // method in public/ so verification survives losing either one.
  verification: {
    google: "gHA85B4fhWFI3DLbr8HKwyOCaDEGpWh31EC4bq1r1BE",
  },
  // max-image-preview:large is what upgrades a plain SERP result to a
  // thumbnail-sized preview; without it Google shows text only.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    type: "profile",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    firstName: "Chanchal",
    lastName: "Verma",
    username: GITHUB_HANDLE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    creator: X_HANDLE,
    site: X_HANDLE,
  },
  other: {
    "profile:username": GITHUB_HANDLE,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ecebe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${bricolage.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Light unless the visitor explicitly chose dark before.
            __html: `(function(){var t='light';try{if(localStorage.getItem('theme')==='dark')t='dark';}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-page">
        {/* Person + WebSite are site-wide facts; per-page graphs reference
            these by @id instead of restating them. */}
        <JsonLd data={graph(personSchema(), websiteSchema())} />
        {children}
        <AskMe />
      </body>
    </html>
  );
}
