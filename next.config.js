/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Remove assetPrefix or update to your own domain if you have one
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '',
}

module.exports = nextConfig 