import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils';
import { getWord } from '@/app/_services/dbFetchers';
import WordPage from '@/app/_components/Pages/WordPage/WordPage';
import supabase from '@/app/_lib/supabase';

interface WordPageParams {
  params: { word: string };
}

export function generateMetadata({ params }: WordPageParams): Metadata {
  return {
    title: capitalizeWord(params.word)
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
