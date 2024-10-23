import db from '@/app/_lib/db';
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
  const setsPromise = db.completedSets.toArray();
  const wordsPromise = db.wordsLearned.toArray();
  const practicesPromise = db.practices.toArray();

  const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  const [completedSets, practices, wordsLearned] = await Promise.all([
    setsPromise,
    practicesPromise,
    wordsPromise
  ]);

  const version = 2;
  const now = new Date();
  const hash = self.crypto.randomUUID().slice(0, 8);
  const timestamp = new Intl.DateTimeFormat().format(now);
  const jsonString = JSON.stringify(
    { completedSets, wordsLearned, practices, userId, version, created: now },
    null,
    2
  );
  const blob = new Blob([jsonString], { type: 'application/json' });

  downloadFile(blob, `limba_vie_progress_${timestamp}_${hash}.json`);
}
