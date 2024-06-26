import { cache } from 'react';
import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils';
import { getSetInfo, getWords } from '@/app/_services/dbFetchers';
import supabase from '@/app/_lib/supabase';
import SetPage from '@/app/_components/Pages/SetPage/SetPage';

interface SetPageParams {
  params: { setName: string };
}

export function generateMetadata({ params }: SetPageParams): Metadata {
  const set = capitalizeWord(params.setName);
  return {
    title: `${set} Set: pratice`
  };
}

const getData = cache(async (setName: string) => {
  const wordsPromise = getWords(setName);
  const setInfoPromise = getSetInfo(setName);

  const [words, setInfo] = await Promise.all([wordsPromise, setInfoPromise]);

  return { words, setInfo };
});

async function Check({ params }: SetPageParams) {
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
