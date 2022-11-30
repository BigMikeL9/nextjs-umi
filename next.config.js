/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
