import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils';
import { getWord } from '@/app/_services/dbFetchers';
import WordPage from '@/app/_components/Pages/WordPage/WordPage';
import supabase from '@/app/_lib/supabase';

interface WordPageParams {
  params: { word: string };
}

export async function generateMetadata({
  params
}: WordPageParams): Promise<Metadata> {
  const { data, error } = await supabase
    .from('words')
    .select('ro')
    .eq('en', params.word);
  if (error) throw error;

  const wordRo = data.at(0)?.ro ?? '';
  const wordEn = params.word;

  return {
    title: `${capitalizeWord(wordRo)} (${capitalizeWord(wordEn)})`,
    description: `Learn about the Romanian word '${wordRo}' ('${wordEn}'). Find its definition, pronunciation, and usage examples to enhance your vocabulary with Limba Vie.`
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
