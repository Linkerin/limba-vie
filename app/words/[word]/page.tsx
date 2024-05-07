import { cache } from 'react';

import WordPage from '@/app/_components/Pages/WordPage/WordPage';
import supabase from '@/app/_lib/supabase';

const getWords = cache(async (word: string) => {
  const { data, error } = await supabase
    .from('words')
    .select(
      `en,
         ro,
         gender_ro,
         plural,
         img_name,
         audio_name`
    )
    .eq('en', word);
  if (error) throw error;

  return data;
});

async function Word({ params }: { params: { word: string } }) {
  const wordParam = decodeURIComponent(params.word);
  const wordArr = await getWords(wordParam);
  const word = wordArr.at(0);

  return <WordPage word={word} wordParam={wordParam} />;
}

export default Word;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('words').select('en');
  if (error) throw error;

  return data.map(word => ({
    word: word.en
  }));
}
