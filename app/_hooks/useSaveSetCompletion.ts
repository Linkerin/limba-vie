'use client';

import db from '../_lib/db';

async function useSaveSetCompletion(setId: number | null | undefined) {
  if (!setId) return false;

  const record = await db.completedSets.put(
    { setId, completedAt: new Date() },
    setId
  );

  if (typeof record !== 'number') return false;

  return true;
}

export default useSaveSetCompletion;
