import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils/utils';
import { getEnWords, getWordByEn } from '@/app/_services/supabase/dbFetchers';
import WordPage from '@/app/_components/_pages/WordPage/WordPage';

interface WordPageParams {
  params: { word: string };
}

export async function generateMetadata({
  params
}: WordPageParams): Promise<Metadata> {
  const wordEn = decodeURIComponent(params.word);

  const word = await getWordByEn(wordEn);
  const wordRo = word?.ro ?? '';

  const description = `Learn about the Romanian word '${wordRo}' ('${wordEn}'). Find its definition, pronunciation, and usage examples to enhance your vocabulary with Limba Vie.`;

  const url = new URL(
    '/api/img/og-image/word',
    process.env.NEXT_PUBLIC_BASE_URL
  );
  const imgParams = new URLSearchParams([
    ['en', encodeURIComponent(wordEn)],
    ['ro', encodeURIComponent(wordRo)],
    ['img', word?.img_name ?? ''],
    ['gender', word?.gender_ro ?? ''],
    ['plural', `${word?.plural}`]
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
  const word = await getWordByEn(wordParam);

  return <WordPage word={word} />;
}

export default Word;

export async function generateStaticParams() {
  const data = await getEnWords();

  return data.map(word => ({
    word: word.en
  }));
}
