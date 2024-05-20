import { cache } from 'react';

import { getSetInfo, getWords } from '@/app/_services/dbFetchers';
import SetPage from '@/app/_components/Pages/SetPage/SetPage';
import supabase from '@/app/_lib/supabase';

const getData = cache(async (setName: string) => {
  const wordsPromise = getWords(setName);
  const setInfoPromise = getSetInfo(setName);

  const [words, setInfo] = await Promise.all([wordsPromise, setInfoPromise]);

  return { words, setInfo };
});

async function Set({ params }: { params: { setName: string } }) {
  const setName = decodeURIComponent(params.setName);
  const { words, setInfo } = await getData(setName);

  return <SetPage words={words} setInfo={setInfo} />;
}

export default Set;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('sets').select('set');
  if (error) throw error;

  return data.map(set => ({
    setName: set.set
  }));
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);
