'use client';

import { useMemo } from 'react';

import db, { type WordsLearned } from '../_lib/db';
import { REPEAT_WORDS_CTY, WORD_REVIEW_PERIOD_MS } from '@/app/_lib/constants';
import { shuffleArr } from '../_lib/utils';
import useCompletedSets from './useCompletedSets';
import { useLiveQuery } from 'dexie-react-hooks';

function getRepeatWordIds(words: WordsLearned[] | undefined) {
  if (!words) return [];

  const now = Date.now();

  const repeatWordIds = words
    .filter(word => {
      switch (word.level) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          return (
            now - word.reviewedAt.valueOf() >= WORD_REVIEW_PERIOD_MS[word.level]
          );

        default:
          return false;
      }
    })
    .map(word => word.wordId);

  return repeatWordIds;
}

function useRepeatBtn() {
  const completedSets = useCompletedSets();
  const completedSetsIds = completedSets
    ? completedSets.map(set => set.setId)
    : [];

  const wordsLearned = useLiveQuery(() => db.wordsLearned.toArray());
  const repeatWordsIds = getRepeatWordIds(wordsLearned);

  const show = useMemo(() => {
    if (completedSetsIds.length > 0 || repeatWordsIds.length > 0) {
      return true;
    }

    return false;
  }, [completedSetsIds.length, repeatWordsIds.length]);

  const setParamArr = shuffleArr(completedSetsIds)
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
