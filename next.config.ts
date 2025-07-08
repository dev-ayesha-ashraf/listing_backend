import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ Allows production build to succeed even if type errors exist
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
