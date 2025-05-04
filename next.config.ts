import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "www.netonnet.se" },
      { hostname: "cdn.webhallen.com" },
    ],
  },
};

export default nextConfig;
