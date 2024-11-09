'use client';

import {
  useLiveCompletedSetsNum,
  type SetsInfo
} from '@/app/_services/dexie/queries/completedSets';

function useCompletedSetsNum(setsInfo: SetsInfo): number | null {
  const completedSets = useLiveCompletedSetsNum(setsInfo);

  return completedSets ? completedSets.length : completedSets;
}

export default useCompletedSetsNum;
