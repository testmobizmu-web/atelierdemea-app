// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      // add more external hosts later if needed:
      // { protocol: "https", hostname: "images.pexels.com" },
      // { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
