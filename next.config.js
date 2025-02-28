/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  // For production builds
  ...(process.env.NODE_ENV === 'production' ? {
    assetPrefix: 'https://alvinayang.com',
    basePath: ''
  } : {})
}

module.exports = nextConfig 