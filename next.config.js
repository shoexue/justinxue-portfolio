/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  distDir: 'out',
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/alvina-yang.github.io',
    assetPrefix: '/alvina-yang.github.io/'
  } : {})
}

module.exports = nextConfig 