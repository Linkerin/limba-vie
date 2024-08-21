import { MetadataRoute } from 'next';
import { token } from '@/styled-system/tokens';

const isPreview = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PREVIEW';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Limba Vie${isPreview ? ' Preview' : ''}`,
    short_name: `Limba Vie${isPreview ? ' Preview' : ''}`,
    description: 'Learn Romanian words with flashcards',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#b23444',
    theme_color: token('colors.background') ?? '#faf7f5',
    categories: ['education'],
    icons: [
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    shortcuts: [
      {
        name: 'Repeat set',
        short_name: 'Repeat',
        description: 'Open repeat set',
        url: '/set/lvrepeat/pwa-redirect',
        icons: [{ src: '/icons/repeat.png', sizes: '192x192' }]
      },
      {
        name: 'About',
        short_name: 'About',
        description: 'Limba Vie application description and legal information',
        url: '/about',
        icons: [{ src: '/icons/info.png', sizes: '192x192' }]
      }
    ]
  };
}
