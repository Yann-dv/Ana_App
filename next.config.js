/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  basePath: '/Ana_App',
  assetPrefix: '/Ana_App/',
  images: {
    unoptimized: true,
    domains: ['localhost', 'example.com'],
  },
  // Remove rewrites for static export
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: '/api/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig;