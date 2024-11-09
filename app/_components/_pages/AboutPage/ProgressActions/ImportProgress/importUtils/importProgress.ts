import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import processImportV1 from './utilsV1';
import processImportV2 from './utilsV2';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

export const recordUserId = (userId: string | null) => {
  if (!userId) return;
  ssrLocalStorage.setItem(LOCAL_STORAGE_KEYS.userId, userId);

  return;
};

/**
 * Imports the progress data from a JSON file and merges it with the existing data in the database.
 *
 * The function parses the JSON data, and then merges the completed sets and words for repeat
 * with the existing data in the database.
 * If the imported data is valid, the function resolves when the merge operation is complete.
 *
 * @param file - The file containing the progress data to be imported.
 * @returns A Promise that resolves when the import operation is complete.
 */
const importProgress = async (file: File): Promise<void> => {
  const jsonString = await file.text();
  const rawData = JSON.parse(jsonString);
  const firstVersion = !rawData?.version || rawData?.version < 2;
  if (firstVersion) {
    await processImportV1(jsonString);
  } else {
    await processImportV2(jsonString);
  }

  console.log('Progress imported successfully');
};

export default importProgress;
