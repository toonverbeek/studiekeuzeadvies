import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The articles are .mdx files under content/artikelen/. app/[artikel]/page.tsx
  // imports them by slug, so they are never routed by their own filename. This
  // setting only teaches the compiler that .mdx is a module it can import.
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
