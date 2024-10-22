'use client';

import db, { type CompletedSet } from '../_lib/db';

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
    await db.practices.add({ completedAt: new Date(), score: null });
  } else {
    if (!setId || !wordsNum) return false;

    const record = await db.completedSets.put(
      { setId, wordsNum, completedAt: new Date() },
      setId
    );

    if (typeof record !== 'number') return false;
  }

  return true;
}

export default useSaveSetCompletion;
