import { cache } from 'react';
import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils/utils';
import { getSetInfo, getSetWords } from '@/app/_services/dbFetchers';
import SetPage from '@/app/_components/_pages/SetPage/SetPage';

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
  const wordsPromise = getSetWords(setName);
  const setInfoPromise = getSetInfo(setName);

  const [words, setInfo] = await Promise.all([wordsPromise, setInfoPromise]);

  return { words, setInfo };
});

async function Set({ params }: SetPageParams) {
  const setName = decodeURIComponent(params.setName);
  const { words, setInfo } = await getData(setName);

  return <SetPage words={words} setInfo={setInfo} />;
}

export default Set;
