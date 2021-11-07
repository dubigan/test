/** @type {import('next').NextConfig} */
// require('dotenv').config({ path: './.env.local' });
module.exports = {
  reactStrictMode: true,
  env: {
    // set only at build time
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
};
