import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Core's origin for the CMS image bridge (src/app/api/cms-media). The image build sets
  // API_BASE_URL per environment and the running site has none, so it is fixed at build.
  env: { CORE_API_ORIGIN: process.env.API_BASE_URL ?? "" },
};

// Local development only (`next dev`). The club's edge does not let a page on
// http://localhost:3000 call its hosts cross-origin, so the CMS editor in the browser calls
// this dev server on its own origin and the server forwards /sandbox-api/* to the sandbox API,
// never to production. .env.example sets CMS_URL=http://localhost:3000/sandbox-api/api.
// `next build` never adds this rewrite, so the image forwards nothing.
const sandboxApi = {
  source: "/sandbox-api/:path*",
  destination: "https://sandbox-api.yildizskylab.com/:path*",
};

export default function config(phase: string): NextConfig {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return nextConfig;
  const cms = process.env.CMS_URL ?? "";
  if (/^https:\/\/([\w-]+\.)*yildizskylab\.com(\/|$)/.test(cms)) {
    console.warn(
      `⚠ CMS_URL=${cms}: the editor's browser would call that host from http://localhost:3000, which the edge does not allow. Use http://localhost:3000/sandbox-api/api (.env.example).`,
    );
  } else if (cms.startsWith("http://localhost") && !process.env.API_BASE_URL) {
    console.warn(
      "⚠ API_BASE_URL is not set: CMS image uploads would go to this dev server instead of core. Set API_BASE_URL=https://sandbox-api.yildizskylab.com (.env.example).",
    );
  }
  return { ...nextConfig, rewrites: async () => [sandboxApi] };
}
