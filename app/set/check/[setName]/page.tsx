import { cache } from 'react';

import { shuffleArr } from '@/app/_lib/utils';
import supabase from '@/app/_lib/supabase';
import SetPage from '@/app/_components/Pages/SetPage/SetPage';

const getWords = cache(async (setName: string) => {
  const { data, error } = await supabase
    .from('words')
    .select(
      `id,
         en,
         en_alternatives,
         ro,
         gender_ro,
         plural,
         img_name,
         audio_name,
         sets!inner(id, set)`
    )
    .eq('sets.set', setName);
  if (error) throw error;

  return data;
});

async function Check({ params }: { params: { setName: string } }) {
  const setName = decodeURIComponent(params.setName);
  const words = await getWords(setName);
  const shuffledWords = shuffleArr(words);

  return <SetPage words={shuffledWords} checkPage />;
}

export default Check;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('sets').select('set');
  if (error) throw error;

  return data.map(set => ({
    setName: set.set
  }));
}

export const dynamic = 'force-dynamic';
export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
