/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // increase limit
    },
  },
  images: {
    qualities: [25, 50, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ctsdmlfovsesotpjiptq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cars-bucket/**",
      },
      {
        protocol: "https",
        hostname: "ctsdmlfovsesotpjiptq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/customer-avatar/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
