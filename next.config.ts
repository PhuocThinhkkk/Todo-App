import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  
  output: "export", // Xuất thành trang tĩnh
  basePath: isProduction ? '/Todo-App' : '', // Thay <REPO_NAME> bằng tên repo GitHub
  // assetPrefix: "/Todo-App/",
  distDir: "dist", 
  images: {
    loader: 'custom',
    loaderFile: './ImageLoader.js'
  },
  reactStrictMode: false, // Tắt Strict Mode
};

export default nextConfig;
