'use client';

import { useMemo } from 'react';
import { captureException } from '@sentry/nextjs';

import { REPEAT_WORDS_CTY } from '@/app/_lib/constants';
import { shuffleArr } from '../_lib/utils';
import ssrLocalStorage from '../_services/SsrLocalStorage';

function getWordForRepeat() {
  try {
    const repeatWordsStr = ssrLocalStorage.getItem('lvRepeatWords');

    if (repeatWordsStr) {
      const repeatWords = JSON.parse(repeatWordsStr);
      const wordIds = Object.keys(repeatWords);

      if (wordIds.length > 0) {
        return wordIds;
      }
    }

    return [];
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.error(err);
    captureException(err, { level: 'warning' });

    return [];
  }
}

function getCompletedSets() {
  try {
    const completedSetsStr = ssrLocalStorage.getItem('lvCompletedSets');

    if (completedSetsStr) {
      const completedSets = JSON.parse(completedSetsStr);
      if (completedSets.length > 0) return completedSets as number[];
    }

    return [];
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.error(err);
    captureException(err, { level: 'warning' });

    return [];
  }
}

function useRepeatBtn() {
  const completedSets = getCompletedSets();
  const wordsForRepeat = getWordForRepeat();

  const show = useMemo(() => {
    if (completedSets.length > 0 || wordsForRepeat.length > 0) {
      return true;
    }

    return false;
  }, [completedSets.length, wordsForRepeat.length]);

  const setParamArr = shuffleArr(completedSets)
    .slice(0, 5)
    .map(val => ['set', `${val}`]);
  const repeatParamArr = shuffleArr(wordsForRepeat)
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
