import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chanchal Verma",
    short_name: "Chanchal",
    description:
      "Portfolio of Chanchal Verma, AI Security Engineer specializing in AI Product Engineering, Agentic AI, Golang, Node.js, React, Kubernetes, and UI/UX.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f2",
    theme_color: "#0d1613",
    icons: [
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
