import { Alata, Kalam } from 'next/font/google';

export const alata = Alata({
  subsets: ['latin'],
  weight: '400',
  preload: true,
  variable: '--font-alata'
});

export const kalam = Kalam({
  subsets: ['latin-ext'],
  weight: ['400'],
  variable: '--font-kalam'
});
