"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Posts published after the last static build have no exported page yet;
    // GitHub Pages serves 404.html for them, so hand off to the client viewer.
    const match = window.location.pathname.match(/^\/blog\/post\/([^/]+)\/?$/);
    if (match) {
      window.location.replace(`/blog/post/?id=${encodeURIComponent(match[1])}`);
      return;
    }
    setRedirecting(false);
  }, []);

  if (redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
        <p className="text-kicker text-amber">404</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 text-ink/56">The page you are looking for may have been moved or removed.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-cobalt to-signal px-5 py-2.5 text-sm font-semibold text-page shadow-md transition-all hover:shadow-lg hover:scale-105"
        >
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
