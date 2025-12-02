import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    domains: [
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aglrwvpxfkfthwcipmnf.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
