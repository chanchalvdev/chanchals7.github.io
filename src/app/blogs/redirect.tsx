"use client";

import { useEffect } from "react";
import Link from "next/link";

export function RedirectToBlog() {
  useEffect(() => {
    window.location.replace("/blog/");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <p className="text-ink-soft">
        Taking you to{" "}
        <Link href="/blog/" className="font-semibold text-ink underline underline-offset-4">
          Writing
        </Link>
        …
      </p>
    </main>
  );
}
