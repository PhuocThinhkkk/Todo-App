import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  
  reactStrictMode: false, // Tắt Strict Mode
   eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
