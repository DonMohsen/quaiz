import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all hostnames
        port: "", // Leave blank to allow all ports
        pathname: "**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
