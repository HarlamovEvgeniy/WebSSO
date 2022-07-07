/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,
  future: {
    webpack5: true
  }
}

module.exports = nextConfig