/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  future: {
    webpack5: true
  },
}

module.exports = nextConfig