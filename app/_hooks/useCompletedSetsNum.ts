'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import db from '../_lib/db';
import type { Tables } from '../_lib/supabase.types';

function useCompletedSetsNum(setIds: Tables<'sets_view'>['id'][]) {
  const completedSets = useLiveQuery(() =>
    db.completedSets.filter(set => setIds.includes(set.setId)).toArray()
  );

  return completedSets ? completedSets.length : 0;
}

export default useCompletedSetsNum;
