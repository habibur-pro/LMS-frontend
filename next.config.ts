import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all domains
        pathname: "**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
