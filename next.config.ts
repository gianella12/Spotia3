import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://127.0.0.1:3000",
      "http://192.168.1.45:3000"
    ]
  }
};

export default nextConfig;



