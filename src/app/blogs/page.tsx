import type { Metadata } from "next";
import { RedirectToBlog } from "./redirect";

// People type /blogs; the section lives at /blog. Static export can't send
// server redirects, so this page forwards in the browser and stays out of
// search results.
export const metadata: Metadata = {
  title: "Writing",
  robots: { index: false, follow: true },
  alternates: { canonical: "/blog/" },
};

export default function BlogsAlias() {
  return <RedirectToBlog />;
}
