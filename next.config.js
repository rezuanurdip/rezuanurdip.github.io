/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath if using a custom domain.
  // If deploying to https://username.github.io/repo-name, set:
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
};

module.exports = nextConfig;
