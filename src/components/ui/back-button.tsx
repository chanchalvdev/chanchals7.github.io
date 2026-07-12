"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <Link
      href="/#projects"
      className="inline-flex items-center gap-2 text-sm font-bold text-ink/58 transition hover:text-cobalt cursor-pointer"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to projects
    </Link>
  );
}
