import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Gebruik dit alleen om tijdelijk te testen
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;