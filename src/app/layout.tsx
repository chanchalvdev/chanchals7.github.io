import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { LoadingProvider } from "@/components/ui/loading-screen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chanchal-verma.dev"),
  title: {
    default: "Chanchal Verma | AI Security Engineer | AI Product Engineering",
    template: "%s | Chanchal Verma",
  },
  description:
    "Portfolio of Chanchal Verma, AI Security Engineer specializing in AI Product Engineering, Agentic AI, Golang, Node.js, React, Kubernetes, and UI/UX design.",
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
  ],
  authors: [{ name: "Chanchal Verma" }],
  openGraph: {
    title: "Chanchal Verma | AI Security Engineer | AI Product Engineering",
    description:
      "AI Security Engineer specializing in Agentic AI, Golang, Node.js, React, Kubernetes, and UI/UX design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chanchal Verma | AI Security Engineer | AI Product Engineering",
    description:
      "AI Security Engineer specializing in Agentic AI, Golang, Node.js, React, Kubernetes, and UI/UX design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${ibmMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-page">
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
