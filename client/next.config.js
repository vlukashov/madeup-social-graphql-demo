/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STEPZEN_API_KEY: process.env.STEPZEN_API_KEY,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cloudflare-ipfs.com", "loremflickr.com"],
  },
};

module.exports = nextConfig;
