import type { Metadata } from 'next';
import { Alata, Kalam } from 'next/font/google';

import Header from './_components/Header/Header';

import './globals.css';

const alata = Alata({ subsets: ['latin'], weight: '400' });
const kalam = Kalam({
  subsets: ['latin-ext'],
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Limba App',
  description: 'Learn Romanian words with flashcards'
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
