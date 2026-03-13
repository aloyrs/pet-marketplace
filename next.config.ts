import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://pets-intrvw.up.railway.app/:path*",
      },
    ];
  },
};

export default nextConfig;
