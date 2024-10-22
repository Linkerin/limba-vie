import db from '@/app/_lib/db';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

export async function deleteAllData() {
  const completedSetsClearPromise = db.completedSets.clear();
  const practicesPromise = db.practices.clear();
  const wordsForRepeatClearPromise = db.wordsForRepeat.clear();
  const wordsLearnedPromise = db.wordsLearned.clear();

  for (let key of Object.values(LOCAL_STORAGE_KEYS)) {
    ssrLocalStorage.removeItem(key);
  }

  await Promise.all([
    completedSetsClearPromise,
    practicesPromise,
    wordsForRepeatClearPromise,
    wordsLearnedPromise
  ]);
}
