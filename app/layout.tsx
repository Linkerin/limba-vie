import dynamic from 'next/dynamic';
import type { Viewport } from 'next';

import { alata } from '@/theme/fonts';
import CookieConsent from './_components/CookieConsent/CookieConsent';
import Header from './_components/Header/Header';
import PracticeFloatingButton from './_components/PracticeFloatingButton/PracticeFloatingButton';
import SoundProvider from './_contexts/SoundProvider';
import IsPracticeNecessaryProvider from './_contexts/IsPracticeNecessaryProvider';
// import WebVitals from './_components/WebVitals';

import './globals.css';

export { metadata } from './metadata';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

const AnonymousSignIn = dynamic(() => import('./_components/AnonymousSignIn'), {
  ssr: false
});
const NavBar = dynamic(() => import('./_components/NavBar/NavBar'), {
  ssr: false
});

const LocalStorageMigration = dynamic(
  () => import('./_components/LocalStorageMigration'),
  { ssr: false }
);

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
          <IsPracticeNecessaryProvider>
            <main id="main">{children}</main>
            <NavBar />
            <PracticeFloatingButton />
          </IsPracticeNecessaryProvider>
          <div id="modal" />
        </SoundProvider>
        <CookieConsent />
        {isProd && <AnonymousSignIn />}
        {/* {isProd && <WebVitals />} */}
        <LocalStorageMigration />
      </body>
    </html>
  );
}
