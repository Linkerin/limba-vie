'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import db from '../_lib/db';

function useCompletedSets() {
  const sets = useLiveQuery(() => db.completedSets.orderBy('setId').toArray());

  return sets ? sets : null;
}

export default useCompletedSets;
