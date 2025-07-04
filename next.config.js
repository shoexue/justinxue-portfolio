/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Ensure assets are copied to the output directory
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://justinxue-portfolio.vercel.app/' : '',
}

module.exports = nextConfig 