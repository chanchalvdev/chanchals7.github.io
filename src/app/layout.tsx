import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, JetBrains_Mono } from "next/font/google";
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

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
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
    "AI Security Engineer",
    "AI Product Engineering",
    "Agentic AI",
    "Golang",
    "Node.js",
    "React",
    "Next.js",
    "Kubernetes",
    "UI/UX",
    "DevOps",
    "Cloud",
    "Cybersecurity",
    "AI threat intelligence",
    "Abu Dhabi software engineer",
    "Senior Full Stack Engineer",
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
    { media: "(prefers-color-scheme: dark)", color: "#163157" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6f4" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${archivo.variable} ${jetbrainsMono.variable} ${bigShoulders.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-page">
        {/* Drawing-sheet frame with corner crop marks (decorative) */}
        <div className="sheet-frame" aria-hidden="true">
          <span className="tl" /><span className="tr" /><span className="bl" /><span className="br" />
        </div>
        {/* Person + WebSite are site-wide facts; per-page graphs reference
            these by @id instead of restating them. */}
        <JsonLd data={graph(personSchema(), websiteSchema())} />
        {children}
      </body>
    </html>
  );
}
