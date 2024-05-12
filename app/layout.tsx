import type { Metadata } from 'next';
import { Alata } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from './_components/Header/Header';
import SoundProvider from './_contexts/SoundProvider';
import WebVitals from './_components/WebVitals';

import './globals.css';

const AnonymousSignIn = dynamic(() => import('./_components/AnonymousSignIn'), {
  ssr: false
});
const NavBar = dynamic(() => import('./_components/NavBar/NavBar'), {
  ssr: false
});

const alata = Alata({
  subsets: ['latin'],
  weight: '400',
  preload: true,
  variable: '--font-alata'
});
const description =
  'Learn and practice Romanian words with colorful flashcards';
const isPreview = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PREVIEW';

export const metadata: Metadata = {
  title: `Limba Vie${isPreview ? ' Preview' : ''}`,
  description: description,
  authors: [{ name: 'Alexei', url: 'https://github.com/Linkerin' }],
  creator: 'Linkerin',
  manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`,
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
  openGraph: {
    title: 'Limba Vie - Learn Romanian words',
    description: description,
    siteName: 'Limba Vie',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/img/og-image` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limba Vie - Learn Romanian words',
    description: description,
    images: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image`
  },
  other: {
    'msapplication-TileColor': '#b23444',
    'msapplication-config': '/favicons/browserconfig.xml'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';

  return (
    <html lang="en">
      <body className={alata.className}>
        <SoundProvider>
          <Header />
          <main>{children}</main>
          <NavBar />
          <div id="modal" />
        </SoundProvider>
        <AnonymousSignIn />
        <WebVitals />
        {isProd && <SpeedInsights />}
        {isProd && <Analytics />}
      </body>
    </html>
  );
}
