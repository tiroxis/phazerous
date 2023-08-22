/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['react-syntax-highlighter', 'swagger-client', 'swagger-ui-react'],
  experimental: {
    forceSwcTransforms: true,
    newNextLinkBehavior: true,
  },
}

module.exports = nextConfig
