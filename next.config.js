/** @type {import('next').NextConfig} */

const ENV = process.env;

const {
  STRIPE_API_KEY,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  FAUNADB_KEY,
  STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL,
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
} = ENV;

const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_API_KEY,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    FAUNADB_KEY,
    STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
};

module.exports = nextConfig;
