/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://alvinayang.com' : '',
}

module.exports = nextConfig 