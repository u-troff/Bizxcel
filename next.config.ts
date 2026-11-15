import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Vercel's domain settings already 308-redirect the apex to www, but this
      // keeps the same behaviour enforced at the app layer in case that domain
      // configuration ever changes or the app moves host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "bizxcelkr.com" }],
        destination: "https://www.bizxcelkr.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
