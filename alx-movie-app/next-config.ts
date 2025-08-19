import { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

// Initialize PWA support
const withPWA = withPWAInit({
  dest: 'public',
  // Additional PWA options can be added here
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

// Define the Next.js configuration
const nextConfig: NextConfig = {
  // Enable React strict mode for improved error handling
  reactStrictMode: true,
  
  // Configure image optimization
  images: {
    // Allow images from specific domains
    domains: ['m.media-amazon.com'],
    
    // Set image device sizes
    deviceSizes: [320, 420, 768, 1024, 1200],
    
    // Set image icon sizes
    iconSizes: [16, 32, 48, 64, 96],
  },
  
  // Enable webpack optimizations
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here
    
    // For example, you can add support for other file types
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg|webp)$/i,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 1000,
    //       publicPath: '/_next/static/images',
    //       outputPath: 'static/images',
    //       name: '[name].[hash:7].[ext]',
    //     },
    //   },
    // });
    
    return config;
  },
  
  // Environment variables
  env: {
    // Add any environment variables here
    APP_NAME: 'ALX Movie App',
  },
  
  // Configure trailing slash behavior
  trailingSlash: false,
  
  // Configure build output directory
  distDir: '.next',
  
  // Enable experimental features (use with caution)
  experimental: {
    // Enable new features like esmExternals
    esmExternals: true,
  },
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Configure powered by header
  poweredByHeader: false,
};

// Export the configuration with PWA support
export default withPWA(nextConfig);
