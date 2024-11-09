'use client';

import type { CompletedSet } from '@/app/_services/dexie/db';
import { putCompletedSet } from '@/app/_services/dexie/queries/completedSets';
import { recordPractice } from '@/app/_services/dexie/queries/practices';

interface UseSaveSetCompletionParams {
  checkPage?: boolean;
  setId: CompletedSet['setId'] | undefined;
  wordsNum: CompletedSet['wordsNum'] | undefined;
}

async function useSaveSetCompletion({
  checkPage,
  setId,
  wordsNum
}: UseSaveSetCompletionParams) {
  if (checkPage) {
    await recordPractice({ completedAt: new Date(), score: null });
  } else {
    if (!setId || !wordsNum) return false;

    const record = await putCompletedSet({
      setId,
      wordsNum,
      completedAt: new Date()
    });

    if (typeof record !== 'number') return false;
  }

  return true;
}

export default useSaveSetCompletion;
