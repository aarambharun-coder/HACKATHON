/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com', 'via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'PCOS Care Connect',
  },
};

module.exports = nextConfig;
