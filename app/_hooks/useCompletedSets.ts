'use client';

import { useLiveCompletedSetsOrderedBySetId } from '@/app/_services/dexie/queries/completedSets';

function useCompletedSets() {
  const sets = useLiveCompletedSetsOrderedBySetId();

  return sets ? sets : null;
}

export default useCompletedSets;
