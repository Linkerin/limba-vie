import { MetadataRoute } from 'next';

import { ARTICLES } from './_lib/constants';
import supabase from './_lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://limba.vercel.app';

  const { data, error } = await supabase.from('words').select('en');
  if (error) throw error;

  const words: MetadataRoute.Sitemap = data.map(word => ({
    url: `${baseUrl}/words/${word.en}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  }));

  const articles: MetadataRoute.Sitemap = Object.values(ARTICLES).map(
    article => ({
      url: `${baseUrl}/tips/grammar/${article.link}`,
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
