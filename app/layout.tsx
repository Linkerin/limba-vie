import { Alata } from 'next/font/google';
import dynamic from 'next/dynamic';

import CookieConsent from './_components/CookieConsent/CookieConsent';
import Header from './_components/Header/Header';
import SoundProvider from './_contexts/SoundProvider';
import UnitsDisableProvider from './_contexts/UnitsDisableProvider';
// import WebVitals from './_components/WebVitals';

import './globals.css';

export { metadata } from './metadata';

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
          <UnitsDisableProvider>
            <Header />
            <main id="main">{children}</main>
            <NavBar />
            <div id="modal" />
          </UnitsDisableProvider>
        </SoundProvider>
        <CookieConsent />
        {isProd && <AnonymousSignIn />}
        {/* {isProd && <WebVitals />} */}
        <LocalStorageMigration />
      </body>
    </html>
  );
}
