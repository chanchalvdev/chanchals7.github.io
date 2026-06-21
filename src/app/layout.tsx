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
    default: "Chanchal Verma | Product-minded Full Stack Engineer",
    template: "%s | Chanchal Verma",
  },
  description:
    "Portfolio of Chanchal Verma, a senior full stack engineer building secure cloud, AI, React, Go, DevOps, and cybersecurity products.",
  keywords: [
    "Chanchal Verma",
    "Senior Full Stack Engineer",
    "React",
    "Next.js",
    "Go",
    "DevOps",
    "Cloud",
    "Cybersecurity",
    "AI threat intelligence",
  ],
  authors: [{ name: "Chanchal Verma" }],
  openGraph: {
    title: "Chanchal Verma | Senior Full Stack Engineer",
    description:
      "Secure cloud and AI systems across React, Go, DevOps, and cybersecurity products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chanchal Verma | Senior Full Stack Engineer",
    description:
      "Secure cloud and AI systems across React, Go, DevOps, and cybersecurity products.",
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
