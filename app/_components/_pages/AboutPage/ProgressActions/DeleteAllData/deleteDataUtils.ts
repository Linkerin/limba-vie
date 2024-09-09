import db from '@/app/_lib/db';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

export async function deleteAllData() {
  const completedSetsClearPromise = db.completedSets.clear();
  const wordsForRepeatClearPromise = db.wordsForRepeat.clear();

  for (let key of Object.values(LOCAL_STORAGE_KEYS)) {
    ssrLocalStorage.removeItem(key);
  }

  await Promise.all([completedSetsClearPromise, wordsForRepeatClearPromise]);
}
