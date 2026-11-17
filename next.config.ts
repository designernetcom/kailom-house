import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.paceassemblytools.com",
        pathname: "/images/mountz/torque-analyzers/**",
      },
    ],
  },
};

export default nextConfig;
