module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['90pixel.com'],
  },
}
