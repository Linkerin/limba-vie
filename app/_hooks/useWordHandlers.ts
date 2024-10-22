'use client';

import { useCallback } from 'react';

import db, { type WordsLearned } from '../_lib/db';
import type { Tables } from '@/app/_lib/supabase.types';

interface UseWordHandlersProps {
  wordId: Tables<'words'>['id'];
}

async function recordNewWord(wordId: Tables<'words'>['id']) {
  const record = await db.wordsLearned.add({
    wordId,
    level: 0,
    mistakenLastTime: false,
    correctAtCurrLevel: 0,
    addedAt: new Date(),
    reviewedAt: new Date()
  });

  return record;
}

function useWordHandlers({ wordId }: UseWordHandlersProps) {
  const repeatButtonHandler = useCallback(async () => {
    const word = await db.wordsLearned.get(wordId);
    if (!word) {
      await recordNewWord(wordId);
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
        await db.wordsLearned.update(wordId, { level: 0, ...miscData });
        break;

      default:
        await db.wordsLearned.update(wordId, { level: 1, ...miscData });
        break;
    }
  }, [wordId]);

  const learnedButtonHandler = useCallback(async () => {
    const word = await db.wordsLearned.get(wordId);
    if (word) return;

    await recordNewWord(wordId);

    return;
  }, [wordId]);

  return {
    learnedButtonHandler,
    repeatButtonHandler
  };
}

export default useWordHandlers;
