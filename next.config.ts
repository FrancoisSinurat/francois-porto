import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js "N" badge in local/mobile preview.
  devIndicators: false,
  images: {
    // remotePatterns: [
    //   {
    //     // protocol: "https",
    //     // hostname: "drive.google.com",
    //   },
    // ],
  },
};

export default nextConfig;
