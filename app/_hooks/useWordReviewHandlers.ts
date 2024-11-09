'use client';

import { useCallback } from 'react';

import {
  getLearnedWord,
  recordLearnedWord,
  updateLearnedWord
} from '@/app/_services/dexie/queries/learnedWords';
import type { Tables } from '@/app/_lib/supabase.types';
import { type WordsLearned } from '@/app/_services/dexie/db';

interface UseWordReviewHandlersProps {
  wordId: Tables<'words'>['id'];
}

function useWordReviewHandlers({ wordId }: UseWordReviewHandlersProps) {
  const correctHandler = useCallback(async () => {
    const word = await getLearnedWord(wordId);

    if (!word) {
      await recordLearnedWord({ wordId, level: 1 });
      return;
    }

    let updateData: Partial<WordsLearned> = {
      mistakenLastTime: false,
      reviewedAt: new Date()
    };

    if (word.level > 4 || word.level < 0) {
      throw new Error('Handling correct answer: word level is not valid');
    }

    switch (word.level) {
      case 3:
        if (word.correctAtCurrLevel < 1) {
          updateData.correctAtCurrLevel = 1;
        } else {
          updateData.level = 4;
          updateData.correctAtCurrLevel = 0;
        }
        break;

      case 4:
        updateData.correctAtCurrLevel = word.correctAtCurrLevel + 1;
        break;

      default:
        updateData.level = word.level + 1;
        updateData.correctAtCurrLevel = 0;
        break;
    }

    await updateLearnedWord(wordId, updateData);

    return;
  }, [wordId]);

  const incorrectHandler = useCallback(async () => {
    const word = await getLearnedWord(wordId);

    if (!word) {
      await recordLearnedWord({ wordId, level: 1, mistaken: true });
      return;
    }

    let updateData: Partial<WordsLearned> = {
      correctAtCurrLevel: 0,
      mistakenLastTime: true,
      reviewedAt: new Date()
    };

    if (word.level > 4 || word.level < 0) {
      throw new Error('Handling incorrect answer: word level is not valid');
    }

    switch (word.level) {
      case 0:
        break;

      case 3:
        updateData.level = 1;
        break;

      default:
        updateData.level = word.level - 1;
        break;
    }

    await updateLearnedWord(wordId, updateData);
  }, [wordId]);

  return { correctHandler, incorrectHandler };
}

export default useWordReviewHandlers;
