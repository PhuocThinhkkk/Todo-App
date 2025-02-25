import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  output: "export", // Xuất thành trang tĩnh
  // basePath: "/Todo-App", // Thay <REPO_NAME> bằng tên repo GitHub
  // assetPrefix: "/Todo-App/",
  distDir: "dist", 
  images: {
    unoptimized: true, // Hỗ trợ ảnh trên GitHub Pages
  },
  reactStrictMode: false, // Tắt Strict Mode
};

export default nextConfig;
