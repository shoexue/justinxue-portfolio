/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://alvinayang.com' : '',
  basePath: '',
  trailingSlash: true,
  distDir: 'out',
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/alvina-yang.github.io',
    assetPrefix: '/alvina-yang.github.io/'
  } : {})
}

module.exports = nextConfig 