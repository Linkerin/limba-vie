import type { Metadata } from 'next';
import { Alata } from 'next/font/google';

import Header from './_components/Header/Header';

import './globals.css';

const alata = Alata({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Limba Vie',
  description: 'Learn Romanian words with flashcards',
  authors: [{ name: 'Alexei', url: 'https://github.com/Linkerin' }],
  creator: 'Linkerin',
  manifest: '/manifest.json',
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
  return (
    <html lang="en">
      <body className={alata.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
