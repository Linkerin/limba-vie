'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import db from '../_lib/db';
import type { Tables } from '../_lib/supabase.types';

function useCompletedSetsNum(setIds: Tables<'sets_view'>['id'][]) {
  const completedSets = useLiveQuery(
    () => db.completedSets.filter(set => setIds.includes(set.setId)).toArray(),
    [],
    null
  );

  return completedSets ? completedSets.length : completedSets;
}

export default useCompletedSetsNum;
