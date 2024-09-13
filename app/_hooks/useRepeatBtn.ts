'use client';

import { useMemo } from 'react';

import db from '../_lib/db';
import { REPEAT_WORDS_CTY } from '@/app/_lib/constants';
import { shuffleArr } from '../_lib/utils';
import useCompletedSets from './useCompletedSets';
import { useLiveQuery } from 'dexie-react-hooks';

function useRepeatBtn() {
  const completedSets = useCompletedSets();
  const competedSetsIds = completedSets
    ? completedSets.map(set => set.setId)
    : [];

  const wordsForRepeat = useLiveQuery(() => db.wordsForRepeat.toArray());
  const repeatWordsIds = wordsForRepeat
    ? wordsForRepeat.map(word => word.wordId)
    : [];

  const show = useMemo(() => {
    if (competedSetsIds.length > 0 || repeatWordsIds.length > 0) {
      return true;
    }

    return false;
  }, [competedSetsIds.length, repeatWordsIds.length]);

  const setParamArr = shuffleArr(competedSetsIds)
    .slice(0, 5)
    .map(val => ['set', `${val}`]);
  const repeatParamArr = shuffleArr(repeatWordsIds)
    .slice(0, REPEAT_WORDS_CTY)
    .map(val => ['r', `${val}`]);

  const params = new URLSearchParams(
    [...repeatParamArr, ...setParamArr].slice(0, REPEAT_WORDS_CTY)
  );
  const url = new URL('/set/lvrepeat', process.env.NEXT_PUBLIC_BASE_URL);
  url.search = params.toString();

  return { show, url };
}

export default useRepeatBtn;
