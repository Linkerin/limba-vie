import { MetadataRoute } from 'next';

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
    background_color: isPreview ? '#887779' : '#b23444',
    theme_color: '#f0eef7',
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
    ]
  };
}
