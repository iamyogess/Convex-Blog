import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "artful-chipmunk-930.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
