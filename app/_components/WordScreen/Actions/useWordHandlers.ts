'use client';

import { useCallback } from 'react';

import {
  getLearnedWord,
  recordLearnedWord,
  updateLearnedWord
} from '@/app/_services/dexie/queries/learnedWords';
import type { Tables } from '@/app/_services/supabase/supabase.types';
import type { WordsLearned } from '@/app/_services/dexie/db';

interface UseWordHandlersProps {
  wordId: Tables<'words'>['id'];
}

function useWordHandlers({ wordId }: UseWordHandlersProps) {
  const repeatButtonHandler = useCallback(async () => {
    const word = await getLearnedWord(wordId);
    if (!word) {
      await recordLearnedWord({ wordId });
      return;
    }

    const miscData: Partial<WordsLearned> = {
      correctAtCurrLevel: 0,
      reviewedAt: new Date()
    };

    switch (word.level) {
      case 0:
        break;

      case 1:
        await updateLearnedWord(wordId, { level: 0, ...miscData });
        break;

      default:
        await updateLearnedWord(wordId, { level: 1, ...miscData });
        break;
    }
  }, [wordId]);

  const learnedButtonHandler = useCallback(async () => {
    const word = await getLearnedWord(wordId);
    if (word) return;

    await recordLearnedWord({ wordId });

    return;
  }, [wordId]);

  return {
    learnedButtonHandler,
    repeatButtonHandler
  };
}

export default useWordHandlers;
