/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  // We'll keep the same output directory as Gatsby
  distDir: 'public',
}

module.exports = nextConfig 