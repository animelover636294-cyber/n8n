/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://checkout.razorpay.com",
              "style-src 'self' 'unsafe-inline' https://*.clerk.com",
              "img-src 'self' data: https://*.clerk.com https://img.clerk.com https://ucarecdn.com",
              "font-src 'self' data:",
              "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://api.razorpay.com wss://*.clerk.accounts.dev",
              "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://checkout.razorpay.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
