import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils/utils';
import { getWord } from '@/app/_services/dbFetchers';
import WordPage from '@/app/_components/_pages/WordPage/WordPage';
import supabase from '@/app/_lib/supabase';

interface WordPageParams {
  params: { word: string };
}

export async function generateMetadata({
  params
}: WordPageParams): Promise<Metadata> {
  const wordEn = decodeURIComponent(params.word);

  const { data, error } = await supabase
    .from('words')
    .select('ro, gender_ro, img_name, plural')
    .eq('en', wordEn);
  if (error) throw error;

  const wordData = data.at(0);
  const wordRo = wordData?.ro ?? '';

  const description = `Learn about the Romanian word '${wordRo}' ('${wordEn}'). Find its definition, pronunciation, and usage examples to enhance your vocabulary with Limba Vie.`;

  const url = new URL(
    '/api/img/og-image/word',
    process.env.NEXT_PUBLIC_BASE_URL
  );
  const imgParams = new URLSearchParams([
    ['en', encodeURIComponent(wordEn)],
    ['ro', encodeURIComponent(wordRo)],
    ['img', wordData?.img_name ?? ''],
    ['gender', wordData?.gender_ro ?? ''],
    ['plural', `${wordData?.plural}`]
  ]);
  url.search = imgParams.toString();

  return {
    title: `${capitalizeWord(wordRo)} (${capitalizeWord(wordEn)})`,
    openGraph: {
      images: url,
      description
    },
    twitter: {
      card: 'summary',
      images: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/img/word-card?word=${encodeURIComponent(wordEn)}`,
      description
    },
    description
  };
}

async function Word({ params }: WordPageParams) {
  const wordParam = decodeURIComponent(params.word);
  const word = await getWord(wordParam);

  return <WordPage word={word} />;
}

export default Word;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('words').select('en');
  if (error) throw error;

  return data.map(word => ({
    word: word.en
  }));
}
