import type { Metadata } from "next";

/**
 * The admin pages are client components and cannot export metadata
 * themselves, so the noindex directive lives here and covers the whole
 * segment. robots.txt disallows /admin/ as well — this is the belt-and-braces
 * half, since a disallowed URL can still be indexed if something links to it.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
