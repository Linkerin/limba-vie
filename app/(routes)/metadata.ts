import type { Metadata } from 'next';

const description = `Master Romanian vocabulary with Limba Vie! Our fun and colorful flashcard app makes learning Romanian words easy. Perfect for anyone who learns Romanian language.`;
const isPreview = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PREVIEW';
const title = `Limba Vie${isPreview ? ' Preview' : ''}`;

export const metadata: Metadata = {
  title: {
    template: `%s · ${title}`,
    default: title
  },
  description: description,
  keywords: [
    'Limba Vie',
    'flashcards',
    'Romanian',
    'learn Romanian',
    'vocabulary',
    'language learning',
    'language app',
    'mobile app',
    'learning app',
    'Moldavian'
  ],
  authors: [{ name: 'Alexei', url: 'https://github.com/Linkerin' }],
  creator: 'Linkerin',
  manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`,
  category: 'education',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicons/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicons/favicon-32x32.png'
      }
    ],
    apple: [
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '180x180',
        url: '/favicons/apple-touch-icon.png'
      },
      {
        rel: 'mask-icon',
        color: '#b23444',
        url: '/favicons/safari-pinned-tab.svg'
      }
    ]
  },
  appleWebApp: {
    title: title,
    startupImage: [
      '/splashscreens/iphone6_splash.png',
      {
        url: '/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 1568px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: '/splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: '/splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)'
      },
      {
        url: '/splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
      },
      {
        url: '/splashscreens/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: '/splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
      },
      {
        url: '/splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: 'splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: 'splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: 'splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
      }
    ]
  },
  openGraph: {
    title: 'Limba Vie - Learn Romanian words',
    description: description,
    siteName: title,
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/img/og-image` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limba Vie - Learn Romanian words',
    description: description,
    images: `${process.env.NEXT_PUBLIC_BASE_URL}/api/img/og-image`
  },
  other: {
    'msapplication-TileColor': '#b23444',
    'msapplication-config': '/favicons/browserconfig.xml'
  }
};
