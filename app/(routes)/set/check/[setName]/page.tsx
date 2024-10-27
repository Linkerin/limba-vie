import { cache } from 'react';
import type { Metadata } from 'next';

import { capitalizeWord } from '@/app/_lib/utils/utils';
import {
  getPrevUnitId,
  getSetInfo,
  getSetWords
} from '@/app/_services/dbFetchers';
import SetPage from '@/app/_components/_pages/SetPage/SetPage';

interface SetPageParams {
  params: { setName: string };
}

export function generateMetadata({ params }: SetPageParams): Metadata {
  const set = capitalizeWord(params.setName);
  return {
    title: `${decodeURIComponent(set ?? '')} set: practice`
  };
}

const getData = cache(async (setName: string) => {
  const wordsPromise = getSetWords(setName);
  const setInfoPromise = getSetInfo(setName);

  const [words, setInfo] = await Promise.all([wordsPromise, setInfoPromise]);

  const prevUnitId = setInfo?.unit_id
    ? await getPrevUnitId(setInfo.unit_id)
    : null;

  return { words, setInfo, prevUnitId };
});

async function Check({ params }: SetPageParams) {
  const setName = decodeURIComponent(params.setName);
  const { words, setInfo, prevUnitId } = await getData(setName);

  return (
    <SetPage
      words={words}
      setInfo={setInfo}
      prevUnitId={prevUnitId}
      checkPage
    />
  );
}

export default Check;

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);
