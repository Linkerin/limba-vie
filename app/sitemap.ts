import type { MetadataRoute } from 'next';

import { ARTICLES } from '@/app/_lib/constants';
import { getEnWords } from '@/app/_services/supabase/dbFetchers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://limba.vercel.app';

  const enWords = await getEnWords();

  const words: MetadataRoute.Sitemap = enWords.map(word => ({
    url: `${baseUrl}/words/${encodeURIComponent(word.en)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  }));

  const articles: MetadataRoute.Sitemap = Object.values(ARTICLES).map(
    article => ({
      url: `${baseUrl}/tips/grammar/${encodeURIComponent(article.link)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about/legal/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: `${baseUrl}/about/legal/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: `${baseUrl}/tips/dict`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    },
    {
      url: `${baseUrl}/tips/grammar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    ...articles,
    ...words
  ];
}
