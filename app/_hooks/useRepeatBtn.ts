'use client';

import { useMemo } from 'react';

import { REPEAT_WORDS_CTY, WORD_REVIEW_PERIOD_MS } from '@/app/_lib/constants';
import { shuffleArr } from '@/app/_lib/utils/utils';
import useCompletedSets from './useCompletedSets';
import { useLiveLearnedWordsSortedByMistaken } from '@/app/_services/dexie/queries/learnedWords';
import type { WordsLearned } from '@/app/_services/dexie/db';

function getRepeatWordIds(words: WordsLearned[] | undefined): number[] {
  if (!words) return [];

  const now = Date.now();

  const repeatWords = words.filter(word => {
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
  });

  const mistakeIds: number[] = [];
  const correctIds: number[] = [];

  repeatWords.forEach(word => {
    if (word.mistakenLastTime) {
      mistakeIds.push(word.wordId);
    } else {
      correctIds.push(word.wordId);
    }
  });

  const shuffledCorrectIds = shuffleArr(correctIds);

  return [...mistakeIds, ...shuffledCorrectIds];
}

function useRepeatBtn() {
  const completedSets = useCompletedSets();
  const completedSetsIds = completedSets
    ? completedSets.map(set => set.setId)
    : [];

  const wordsLearned = useLiveLearnedWordsSortedByMistaken();
  const repeatWordsIds = getRepeatWordIds(wordsLearned);

  const show = useMemo(() => {
    if (completedSetsIds.length > 0 || repeatWordsIds.length > 0) {
      return true;
    }

    return false;
  }, [completedSetsIds.length, repeatWordsIds.length]);

  const repeatParamArr = repeatWordsIds
    .slice(0, REPEAT_WORDS_CTY)
    .map(val => ['r', `${val}`]);

  const setParamArr = shuffleArr(completedSetsIds)
    .slice(0, 5)
    .map(val => ['set', `${val}`]);

  const params = new URLSearchParams(
    [...repeatParamArr, ...setParamArr].slice(0, REPEAT_WORDS_CTY)
  );
  const url = new URL('/set/lvrepeat', process.env.NEXT_PUBLIC_BASE_URL);
  url.search = params.toString();

  return { show, url };
}

export default useRepeatBtn;
