import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/set/',
        '/404/',
        '/500/',
        '/about/legal/terms-of-service',
        '/about/legal/privacy-policy'
      ]
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
  };
}
