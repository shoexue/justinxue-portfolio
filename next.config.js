/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Remove distDir as Vercel handles this
  ...(process.env.NODE_ENV === 'production' ? {
    assetPrefix: 'https://alvinayang.com'
  } : {})
}

module.exports = nextConfig 