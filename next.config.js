/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    RESEMBLE_KEY: process.env.RESEMBLE_KEY,
    RESEMBLE_PROJECT_ID: process.env.RESEMBLE_PROJECT_ID,
  },
  serverRuntimeConfig: {
    OAI_KEY: process.env.OAI_KEY,
    RESEMBLE_KEY: process.env.RESEMBLE_KEY,
  },
};

module.exports = nextConfig;
