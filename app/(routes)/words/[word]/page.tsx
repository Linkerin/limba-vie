import type { Metadata } from 'next';

import { CANONICAL_URL } from '@/app/_lib/constants';
import { capitalizeWord } from '@/app/_lib/utils/utils';
import { getEnWords, getWordByEn } from '@/app/_services/supabase/dbFetchers';
import WordView from '@/app/_components/_views/words/WordView';

interface WordPageParams {
  params: { word: string };
}

export async function generateMetadata({
  params
}: WordPageParams): Promise<Metadata> {
  const wordEn = decodeURIComponent(params.word);
  const encodedWordEn = encodeURIComponent(wordEn);

  const word = await getWordByEn(wordEn);
  const wordRo = word?.ro ?? '';

  const description = `Learn about the Romanian word '${wordRo}' ('${wordEn}'). Find its definition, pronunciation, and usage examples to enhance your vocabulary with Limba Vie.`;

  const url = new URL(
    '/api/img/og-image/word',
    process.env.NEXT_PUBLIC_BASE_URL
  );
  const imgParams = new URLSearchParams([
    ['en', encodedWordEn],
    ['ro', encodeURIComponent(wordRo)],
    ['img', word?.img_name ?? ''],
    ['gender', word?.gender_ro ?? ''],
    ['plural', `${word?.plural}`]
  ]);
  url.search = imgParams.toString();

  return {
    title: `${capitalizeWord(wordRo)} (${capitalizeWord(wordEn)})`,
    alternates: {
      canonical: `${CANONICAL_URL}/words/${encodedWordEn}`
    },
    openGraph: {
      images: url,
      description
    },
    twitter: {
      card: 'summary',
      images: `${process.env.NEXT_PUBLIC_BASE_URL}/api/img/word-card?word=${encodedWordEn}`,
      description
    },
    description
  };
}

async function WordPage({ params }: WordPageParams) {
  const wordParam = decodeURIComponent(params.word);
  const word = await getWordByEn(wordParam);

  return <WordView word={word} />;
}

export default WordPage;

export async function generateStaticParams() {
  const data = await getEnWords();

  return data.map(word => ({
    word: word.en
  }));
}
