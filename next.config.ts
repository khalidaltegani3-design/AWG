
import type {NextConfig} from 'next';
require('dotenv').config();

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // This is to fix some issues with libraries that are not designed for SSR
    if (isServer) {
        // Example: config.externals.push('some-lib');
    }

    // Example: config.resolve.fallback = { ... };

    return config;
  },
  experimental: {
    // Other experimental features can go here in the future
  },
  // This is to allow the Next.js dev server to accept requests from the
  // Studio UI, which is served on a different origin.
  allowedDevOrigins: [
    'https://*.cloudworkstations.dev',
    'https://*.firebase.app',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'commondatastorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow blob URLs for image previews
    domains: ['blob'],
  },
  reactStrictMode: false,
};

export default nextConfig;
