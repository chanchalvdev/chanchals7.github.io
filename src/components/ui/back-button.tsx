"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <Link
      href="/#projects"
      className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to projects
    </Link>
  );
}
