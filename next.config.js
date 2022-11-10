/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io/**",
      },
    ],
  },
};

module.exports = nextConfig;
