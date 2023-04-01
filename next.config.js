/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    OAI_KEY: process.env.OAI_KEY,
  },
  serverRuntimeConfig: {
    OAI_KEY: process.env.OAI_KEY,
  },
};

module.exports = nextConfig;
