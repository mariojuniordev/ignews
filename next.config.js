/** @type {import('next').NextConfig} */

const ENV = proces.env;

const { STRIPE_API_KEY } = ENV;

const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_API_KEY,
  },
};

module.exports = nextConfig;
