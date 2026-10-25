"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SheetLoader } from "@/components/ui/sheet-loader";

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
    // Client component, so no metadata export — set the tab title here.
    document.title = "Page not found | Chanchal Verma";
    setRedirecting(false);
  }, []);

  if (redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <SheetLoader label="Opening post" detail="Handing off to the post viewer" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-3 pt-6 sm:px-6">
        <div className="tile mx-auto flex min-h-[55vh] max-w-[82rem] flex-col items-center justify-center px-6 py-16 text-center">
          <p className="lbl rounded-full bg-[var(--tile-lime-bg)] px-3 py-1 text-[var(--tile-lime-fg)]">404</p>
          <h1 className="text-display mt-5 text-4xl font-extrabold text-ink sm:text-6xl">Page not found</h1>
          <p className="mt-4 max-w-md text-ink-soft">The page you are looking for may have been moved or removed.</p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--tile-ink-bg)] px-5 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
