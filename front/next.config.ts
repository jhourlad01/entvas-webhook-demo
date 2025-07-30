import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  // WSL compatibility settings
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500, // Faster polling
        aggregateTimeout: 200, // Faster aggregation
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
    }
    return config;
  },
  // Disable webpack cache in development for WSL
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
