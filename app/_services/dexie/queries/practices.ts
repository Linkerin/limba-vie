import { useLiveQuery } from 'dexie-react-hooks';

import db, { type Practices } from '../db';

export async function recordPractice(practiceInfo: Omit<Practices, 'id'>) {
  const recordId = await db.practices.add(practiceInfo);

  return recordId;
}

export function useLiveLastPractice() {
  return useLiveQuery(() => db.practices.orderBy('completedAt').last());
}
