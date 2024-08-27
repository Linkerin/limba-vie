import createMDX from '@next/mdx';
import crypto from 'crypto';
import withBundleAnalyzer from '@next/bundle-analyzer';
import remarkGfm from 'remark-gfm';
import { withSentryConfig } from '@sentry/nextjs';
import withSerwistInit from '@serwist/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'epzcxetjipqthrjrvzcu.supabase.co',
        port: '',
        pathname: '/storage/v1/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dgqxrmnjx/image/**'
      }
    ]
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm]
  }
});

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [
    { url: '/', revision: crypto.randomUUID() },
    { url: '/~offline', revision: crypto.randomUUID() },
    { url: '/about', revision: crypto.randomUUID() },
    { url: '/tips/grammar', revision: crypto.randomUUID() },
    { url: '/images/lost_connection.webp', revision: crypto.randomUUID() },
    { url: '/images/no_image.svg', revision: crypto.randomUUID() },
    { url: '/sounds/tadam.aac', revision: crypto.randomUUID() },
    { url: '/sounds/error-modal.aac', revision: crypto.randomUUID() },
    { url: '/sounds/success-modal.aac', revision: crypto.randomUUID() }
  ],
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development'
});

const sentryConfig = withSentryConfig(
  withSerwist(withMDX(nextConfig)),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'linkerins-org',
    project: 'limba-vie'
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  }
);

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(sentryConfig)
  : sentryConfig;
