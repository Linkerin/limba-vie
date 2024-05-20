import { cache } from 'react';

import { getSetInfo, getWords } from '@/app/_services/dbFetchers';
import supabase from '@/app/_lib/supabase';
import SetPage from '@/app/_components/Pages/SetPage/SetPage';

const getData = cache(async (setName: string) => {
  const wordsPromise = getWords(setName);
  const setInfoPromise = getSetInfo(setName);

  const [words, setInfo] = await Promise.all([wordsPromise, setInfoPromise]);

  return { words, setInfo };
});

async function Check({ params }: { params: { setName: string } }) {
  const setName = decodeURIComponent(params.setName);
  const { words, setInfo } = await getData(setName);

  return <SetPage words={words} setInfo={setInfo} checkPage />;
}

export default Check;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('sets').select('set');
  if (error) throw error;

  return data.map(set => ({
    setName: set.set
  }));
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);
