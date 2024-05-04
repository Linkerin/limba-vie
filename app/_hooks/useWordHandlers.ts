'use client';

import { useCallback } from 'react';

import type { Tables } from '@/app/_lib/supabase.types';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

const key = LOCAL_STORAGE_KEYS.repeatWords;

interface UseWordHandlersProps {
  wordId: Tables<'words'>['id'];
}

function useWordHandlers({ wordId }: UseWordHandlersProps) {
  const repeatHandler = useCallback(() => {
    const repeatWordsStr = ssrLocalStorage.getItem(key);
    if (!repeatWordsStr) {
      ssrLocalStorage.setItem(key, JSON.stringify({ [wordId]: 3 }));

      return;
    }

    const repeatWords = JSON.parse(repeatWordsStr);

    const updatedRepeatWords = { ...repeatWords, [wordId]: 3 };
    ssrLocalStorage.setItem(key, JSON.stringify(updatedRepeatWords));

    return;
  }, [wordId]);

  const learnedHandler = useCallback(() => {
    const repeatWordsStr = ssrLocalStorage.getItem(key);

    if (!repeatWordsStr) return;

    const repeatWords = JSON.parse(repeatWordsStr);
    if (!repeatWords[wordId]) return;

    if (repeatWords[wordId] <= 1) {
      const filteredArrOfRepeatWords = Object.entries(repeatWords).filter(
        ([key, _]) => key !== wordId.toString()
      );

      let updatedRepeatWords = Object.fromEntries(filteredArrOfRepeatWords);
      ssrLocalStorage.setItem(key, JSON.stringify(updatedRepeatWords));

      return;
    }

    const updatedRepeatWords = {
      ...repeatWords,
      [wordId]: repeatWords[wordId] - 1
    };
    ssrLocalStorage.setItem(key, JSON.stringify(updatedRepeatWords));

    return;
  }, [wordId]);

  return {
    learnedHandler,
    repeatHandler
  };
}

export default useWordHandlers;
