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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.accounts.dev https://*.clerk.com https://checkout.razorpay.com blob:",
              "worker-src 'self' blob: https://*.clerk.accounts.dev https://*.accounts.dev",
              "style-src 'self' 'unsafe-inline' https://*.clerk.com https://*.accounts.dev https://cdn.jsdelivr.net https://*.jsdelivr.net",
              "img-src 'self' data: https://*.clerk.com https://img.clerk.com https://ucarecdn.com https://*.accounts.dev",
              "font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai https://*.perplexity.ai",
              "connect-src 'self' https://*.clerk.accounts.dev https://*.accounts.dev https://*.clerk.com https://api.razorpay.com wss://*.clerk.accounts.dev wss://*.accounts.dev",
              "frame-src 'self' https://*.clerk.accounts.dev https://*.accounts.dev https://*.clerk.com https://checkout.razorpay.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
