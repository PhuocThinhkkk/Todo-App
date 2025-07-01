import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  
  reactStrictMode: false, // Tắt Strict Mode
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;