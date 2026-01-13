import withPWAInit from "@ducanh2912/next-pwa";
import { NextConfig } from "next/dist/server/config";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  // https://github.com/payloadcms/payload/issues/12550#issuecomment-2939070941
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "http",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "wallpapercave.com",
      },
      {
        protocol: "https",
        hostname: "dancyflix.com",
      },
    ],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "edge") {
      // Prevent 'ws' from being bundled in Edge Runtime to avoid 'process.versions' warning
      config.resolve.alias = {
        ...config.resolve.alias,
        ws: false,
      };
    }
    return config;
  },
};

const pwa = withPWA(nextConfig);

export default pwa;
