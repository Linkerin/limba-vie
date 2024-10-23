'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import db from '../_lib/db';
import type { Tables } from '../_lib/supabase.types';
import { isSetCompleted } from '../_lib/utils';

export type SetsInfo = Record<
  Exclude<Tables<'sets_view'>['id'], null>,
  { wordsNum: Tables<'sets_view'>['words_count'] }
>;

function useCompletedSetsNum(setsInfo: SetsInfo): number | null {
  const completedSets = useLiveQuery(
    () =>
      db.completedSets
        .filter(set => {
          if (!set.setId) return false;

          const setWordsNum = setsInfo[set.setId]?.wordsNum;
          if (
            setsInfo[set.setId] &&
            isSetCompleted(setWordsNum, set.wordsNum)
          ) {
            return true;
          }

          return false;
        })
        .toArray(),
    [],
    null
  );

  return completedSets ? completedSets.length : completedSets;
}

export default useCompletedSetsNum;
