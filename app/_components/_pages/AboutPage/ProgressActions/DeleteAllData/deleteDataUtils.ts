import { clearTables } from '@/app/_services/dexie/dbUtils';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

export async function deleteAllData() {
  const deleteTablesPromise = clearTables();

  for (let key of Object.values(LOCAL_STORAGE_KEYS)) {
    ssrLocalStorage.removeItem(key);
  }

  await deleteTablesPromise;
}
