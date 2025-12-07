/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atelierdemea.com",
      },
      {
        protocol: "https",
        hostname: "pe56d.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "rvmltssktlflzssakulz.supabase.co", // ✅ SUPABASE!!
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;

