'use client';

import { useCallback } from 'react';

import db from '../_lib/db';
import type { Tables } from '@/app/_lib/supabase.types';

interface UseWordHandlersProps {
  wordId: Tables<'words'>['id'];
}

function useWordHandlers({ wordId }: UseWordHandlersProps) {
  const repeatHandler = useCallback(async () => {
    if (!wordId) return false;

    const now = new Date();
    const record = await db.wordsForRepeat.put(
      {
        wordId,
        repeatTimes: 3,
        addedAt: now.toISOString()
      },
      wordId
    );

    if (typeof record !== 'number') return false;

    return true;
  }, [wordId]);

  const learnedHandler = useCallback(async () => {
    const word = await db.wordsForRepeat.get(wordId);

    if (!word) return false;

    if (word.repeatTimes <= 1) {
      await db.wordsForRepeat.delete(wordId);
      return true;
    }

    const record = await db.wordsForRepeat.update(wordId, {
      repeatTimes: word.repeatTimes - 1
    });

    if (typeof record !== 'number') return false;

    return true;
  }, [wordId]);

  return {
    learnedHandler,
    repeatHandler
  };
}

export default useWordHandlers;
