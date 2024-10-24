'use client';

import { useCallback } from 'react';

import db, { type WordsLearned } from '../_lib/db';
import type { Tables } from '@/app/_lib/supabase.types';

interface UseWordReviewHandlersProps {
  wordId: Tables<'words'>['id'];
}

async function recordNewWord(
  wordId: Tables<'words'>['id'],
  mistaken?: boolean
) {
  const now = new Date();

  const record = await db.wordsLearned.add({
    wordId,
    level: 1,
    mistakenLastTime: mistaken ?? false,
    correctAtCurrLevel: 0,
    addedAt: now,
    reviewedAt: now
  });

  return record;
}

function useWordReviewHandlers({ wordId }: UseWordReviewHandlersProps) {
  const correctHandler = useCallback(async () => {
    const word = await db.wordsLearned.get(wordId);

    if (!word) {
      await recordNewWord(wordId);
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

    await db.wordsLearned.update(wordId, updateData);

    return;
  }, [wordId]);

  const incorrectHandler = useCallback(async () => {
    const word = await db.wordsLearned.get(wordId);

    if (!word) {
      await recordNewWord(wordId, true);
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

    await db.wordsLearned.update(wordId, updateData);
  }, [wordId]);

  return { correctHandler, incorrectHandler };
}

export default useWordReviewHandlers;
