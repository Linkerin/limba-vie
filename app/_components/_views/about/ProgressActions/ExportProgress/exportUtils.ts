import { getAllData } from '@/app/_services/dexie/dbUtils';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateProgressJson() {
  const allDataPromise = getAllData();
  const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  const version = 2;
  const now = new Date();
  const hash = self.crypto.randomUUID().slice(0, 8);
  const timestamp = new Intl.DateTimeFormat().format(now);

  const [completedSets, practices, wordsLearned] = await allDataPromise;
  const jsonString = JSON.stringify(
    { completedSets, wordsLearned, practices, userId, version, created: now },
    null,
    2
  );
  const blob = new Blob([jsonString], { type: 'application/json' });

  downloadFile(blob, `limba_vie_progress_${timestamp}_${hash}.json`);
}
