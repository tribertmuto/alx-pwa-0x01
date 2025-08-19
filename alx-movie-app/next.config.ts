import { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

// Initialize PWA support with optimized configuration
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/m\.media-amazon\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'movie-images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/api\..*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 5, // 5 minutes
          },
        },
      },
    ],
  },
});

// Define the Next.js configuration
const nextConfig: NextConfig = {
  // Enable React strict mode for improved error handling
  reactStrictMode: true,

  // Enable SWC minification for faster builds
  swcMinify: true,

  // Configure image optimization with modern approach
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['m.media-amazon.com'], // for backward compatibility
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    formats: ['image/webp', 'image/avif'],
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Environment variables
  env: {
    APP_NAME: 'ALX Movie App',
    APP_VERSION: process.env.npm_package_version || '1.0.0',
  },

  // Output + misc config
  trailingSlash: false,
  distDir: '.next',
  poweredByHeader: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  experimental: {
    esmExternals: true,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/movies/:path*',
        destination: '/api/movies/:path*',
      },
    ];
  },
};

// Export final config with PWA support
export default withPWA(nextConfig);
