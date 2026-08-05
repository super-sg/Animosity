import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Cover art on the setlist page comes straight off Apple's artwork CDN,
     * which shards across is1-ssl … is5-ssl. See `SETLIST` in
     * src/data/band.ts — nothing else remote is loaded anywhere on the site.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
