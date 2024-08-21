import { cache } from 'react';
import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils';
import { getPrevUnitId } from '@/app/_services/actions';
import { getSetInfo, getWords } from '@/app/_services/dbFetchers';
import SetPage from '@/app/_components/Pages/SetPage/SetPage';
import supabase from '@/app/_lib/supabase';

interface SetPageParams {
  params: { setName: string };
}

export function generateMetadata({ params }: SetPageParams): Metadata {
  const set = capitalizeWord(params.setName);
  return {
    title: `${decodeURIComponent(set ?? '')} set`
  };
}

const getData = cache(async (setName: string) => {
  const wordsPromise = getWords(setName);
  const setInfoPromise = getSetInfo(setName);

  const [words, setInfo] = await Promise.all([wordsPromise, setInfoPromise]);

  const prevUnitId = setInfo?.unit_id
    ? await getPrevUnitId(setInfo.unit_id)
    : null;

  return { words, setInfo, prevUnitId };
});

async function Set({ params }: SetPageParams) {
  const setName = decodeURIComponent(params.setName);
  const { words, setInfo, prevUnitId } = await getData(setName);

  return <SetPage words={words} setInfo={setInfo} prevUnitId={prevUnitId} />;
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
