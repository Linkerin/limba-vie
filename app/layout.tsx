import { Alata } from 'next/font/google';
import dynamic from 'next/dynamic';

import Header from './_components/Header/Header';
import SoundProvider from './_contexts/SoundProvider';
import WebVitals from './_components/WebVitals';

import './globals.css';

export { metadata } from './metadata';

const AnonymousSignIn = dynamic(() => import('./_components/AnonymousSignIn'), {
  ssr: false
});
const CookieConsent = dynamic(
  () => import('./_components/CookieConsent/CookieConsent'),
  { ssr: false }
);
const NavBar = dynamic(() => import('./_components/NavBar/NavBar'), {
  ssr: false
});

const alata = Alata({
  subsets: ['latin'],
  weight: '400',
  preload: true,
  variable: '--font-alata'
});

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
          <main id="main">{children}</main>
          <NavBar />
          <div id="modal" />
        </SoundProvider>
        <CookieConsent />
        {isProd && <AnonymousSignIn />}
        {/* {isProd && <WebVitals />} */}
      </body>
    </html>
  );
}
