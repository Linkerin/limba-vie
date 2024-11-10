import { useLiveQuery } from 'dexie-react-hooks';

import db, { type CompletedSet } from '../db';
import { isSetCompleted } from '@/app/_lib/utils/utils';
import type { Tables } from '@/app/_services/supabase/supabase.types';

export async function getCompletedSet(setId: CompletedSet['setId']) {
  const set = await db.completedSets.get(setId);

  return set;
}

export async function putCompletedSet(completedSetInfo: CompletedSet) {
  const record = await db.completedSets.put(completedSetInfo);

  return record;
}

export function useLiveCompletedSet(setId: CompletedSet['setId']) {
  return useLiveQuery(() => db.completedSets.get(setId));
}

export type SetsInfo = Record<
  Exclude<Tables<'sets_view'>['id'], null>,
  { wordsNum: Tables<'sets_view'>['words_count'] }
>;

export function useLiveCompletedSetsNum(setsInfo: SetsInfo) {
  return useLiveQuery(
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
}

export function useLiveCompletedSetsOrderedBySetId() {
  return useLiveQuery(() => db.completedSets.orderBy('setId').toArray());
}
