import db, {
  type CompletedSet,
  type Practices,
  type WordsForRepeat,
  type WordsLearned
} from './db';

/**
 * Clears all data from the Dexie database tables.
 *
 * @returns A Promise that resolves when all the data has been cleared from the database.
 */
export function clearTables() {
  const completedSetsClearPromise = db.completedSets.clear();
  const practicesPromise = db.practices.clear();
  const wordsForRepeatClearPromise = db.wordsForRepeat.clear();
  const wordsLearnedPromise = db.wordsLearned.clear();

  return Promise.all([
    completedSetsClearPromise,
    practicesPromise,
    wordsForRepeatClearPromise,
    wordsLearnedPromise
  ]);
}

/**
 * Retrieves all the data from the Dexie database tables.
 *
 * @returns A Promise that resolves to an array containing three arrays:
 * the first array contains all the completed sets,
 * the second array contains all the practices,
 * and the third array contains all the words learned.
 */
export function getAllData(): Promise<
  [CompletedSet[], Practices[], WordsLearned[]]
> {
  const setsPromise = db.completedSets.toArray();
  const practicesPromise = db.practices.toArray();
  const wordsPromise = db.wordsLearned.toArray();

  return Promise.all([setsPromise, practicesPromise, wordsPromise]);
}

/**
 * Merges the provided completed sets with the existing sets in the database.
 *
 * This function compares the provided `importedSets` with the existing sets in the
 * database, and updates the database with any new or more recent completed sets.
 *
 * @param importedSets - An array of `CompletedSet` objects representing the sets to be imported.
 * @returns A Promise that resolves when the merge operation is complete.
 */
export const mergeCompletedSets = async (importedSets: CompletedSet[]) => {
  const importedIds = importedSets.map(set => set.setId);
  const existingSets = await db.completedSets.bulkGet(importedIds);
  const setsForWriting: CompletedSet[] = [];

  importedSets.forEach(set => {
    const existingSet = existingSets.find(elem => elem?.setId === set.setId);

    if (!existingSet || set.completedAt > existingSet.completedAt) {
      setsForWriting.push(set);
    }
  });

  await db.completedSets.bulkPut(setsForWriting);
};

/**
 * Merges the provided practices with the existing practices in the database.
 *
 * This function compares the provided `importedPractices` with the existing practices in the
 * database, and updates the database with any new or more recent practices.
 *
 * @param importedPractices - An array of `Practices` objects representing the practices to be imported.
 * @returns A Promise that resolves when the merge operation is complete.
 */
export const mergePractices = async (importedPractices: Practices[]) => {
  const importedIds = importedPractices.map(practice => practice.id);
  const existingPractices = await db.practices.bulkGet(importedIds);
  const practicesForWriting: Practices[] = [];

  importedPractices.forEach(practice => {
    const existingPractice = existingPractices.find(
      elem => elem?.id === practice.id
    );

    if (
      !existingPractice ||
      practice.completedAt > existingPractice.completedAt
    ) {
      practicesForWriting.push(practice);
    }
  });

  await db.practices.bulkPut(practicesForWriting);
};

/**
 * Merges the provided words for repeat with the existing words in the database.
 * New implementation, v2 of the import progress.
 *
 * This function compares the provided `importedWords` with the existing words in the
 * database, and updates the database with any new or more recent words for repeat.
 *
 * @param importedWords - An array of `WordsForRepeat` objects representing the words to be imported.
 * @returns A Promise that resolves when the merge operation is complete.
 */
export const mergeWordsLearned = async (importedWords: WordsLearned[]) => {
  const importedIds = importedWords.map(word => word.wordId);
  const existingWords = await db.wordsLearned.bulkGet(importedIds);
  const wordsForWriting: WordsLearned[] = [];

  importedWords.forEach(word => {
    const existingWord = existingWords.find(
      elem => elem?.wordId === word.wordId
    );

    if (!existingWord || word.reviewedAt > existingWord.reviewedAt) {
      wordsForWriting.push(word);
    }
  });

  await db.wordsLearned.bulkPut(wordsForWriting);
};

/**
 * Merges the provided words for repeat with the existing words in the database.
 * Old implementation, v1 of the import progress.
 *
 * This function compares the provided `importedWords` with the existing words in the
 * database, and updates the database with any new or more recent words for repeat.
 *
 * @param importedWords - An array of `WordsForRepeat` objects representing the words to be imported.
 * @returns A Promise that resolves when the merge operation is complete.
 */
export const mergeWordsForRepeat = async (importedWords: WordsForRepeat[]) => {
  const importedIds = importedWords.map(word => word.wordId);
  const existingWords = await db.wordsForRepeat.bulkGet(importedIds);
  const wordsForWriting: WordsForRepeat[] = [];

  for (let i = 0; i < importedWords.length; i++) {
    const importedWord: WordsForRepeat = importedWords[i];
    const existingWord = existingWords[i];

    if (
      !existingWord ||
      importedWord.addedAt > existingWord.addedAt ||
      importedWord.repeatTimes > existingWord.repeatTimes
    ) {
      wordsForWriting.push(importedWord);
    }
  }

  await db.wordsForRepeat.bulkPut(wordsForWriting);
};
