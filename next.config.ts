import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    TMDB_TOKEN: process.env.TMDB_TOKEN,
    DOMAIN_API: process.env.DOMAIN_API,
    DOMAIN_CDN_IMAGE: process.env.DOMAIN_CDN_IMAGE,
    DOMAIN_TMDB_API: process.env.DOMAIN_TMDB_API,
    DOMAIN_TMDB_IMAGE: process.env.DOMAIN_TMDB_IMAGE,
  },
  experimental: {
    scrollRestoration: true,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

export default nextConfig;
