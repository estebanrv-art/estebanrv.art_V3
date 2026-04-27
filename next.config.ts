import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allows production builds even with type errors (e.g. during rapid dev)
    ignoreBuildErrors: true,
  },
  images: {
    // Allow unoptimized images for local/external placeholder URLs
    unoptimized: true,
  },
};

export default nextConfig;
