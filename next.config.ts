import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.paceassemblytools.com",
        pathname: "/images/mountz/torque-analyzers/**",
      },
      {
        protocol: "https",
        hostname: "www.paceassemblytools.com",
        pathname: "/images/mountz/torque-sensors/**",
      },
    ],
  },
};

export default nextConfig;
