import db, {
  type CompletedSet,
  type WordsForRepeat
} from '../../../../../../_lib/db';
import { mergeCompletedSets } from './importProgress';
import type { Progress } from '@/app/_lib/types';
import { recordUserId } from './importProgress';

/**
 * Validates whether the provided `data` object is a valid `Progress` object.
 *
 * @param data - The object to validate.
 * @returns `true` if the `data` object is valid, `false` otherwise.
 */
const isValidProgressJson = (data: any): data is Progress => {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(data.completedSets) &&
    Array.isArray(data.wordsForRepeat) &&
    data.created instanceof Date &&
    !isNaN(data.created.valueOf()) &&
    (typeof data.userId === 'string' || data.userId === null)
  );
};

/**
 * Validates whether the provided `set` object is a valid `CompletedSet` object.
 *
 * @param set - The object to validate.
 * @returns `true` if the `set` object is valid, `false` otherwise.
 */
const isValidCompletedSet = (set: any): set is CompletedSet => {
  return (
    typeof set === 'object' &&
    set !== null &&
    typeof set.setId === 'number' &&
    set.completedAt instanceof Date &&
    !isNaN(set.completedAt.valueOf())
  );
};

/**
 * Validates whether the provided `word` object is a valid `WordsForRepeat` object.
 *
 * @param word - The object to validate.
 * @returns `true` if the `word` object is valid, `false` otherwise.
 */
const isValidWordForRepeat = (word: any): word is WordsForRepeat => {
  return (
    typeof word === 'object' &&
    word !== null &&
    typeof word.wordId === 'number' &&
    typeof word.repeatTimes === 'number' &&
    word.addedAt instanceof Date &&
    !isNaN(word.addedAt.valueOf())
  );
};

/**
 * Parses the provided JSON string into a `Progress` object,
 * handling the conversion of date-related fields.
 *
 * @param jsonStr - The JSON string to parse.
 * @returns The parsed `Progress` object.
 * @throws {Error} If the JSON structure is invalid.
 */
const parseImportedData = (jsonStr: string): Progress => {
  const parsed = JSON.parse(jsonStr, (key, value) => {
    const keyAttr = key as keyof Progress;
    switch (keyAttr) {
      case 'created':
        return new Date(value);

      case 'completedSets': {
        const parsedDateArr = value.map(
          (elem: Record<string, string | number>) => ({
            ...elem,
            completedAt: new Date(elem.completedAt)
          })
        );
        return parsedDateArr;
      }

      case 'wordsForRepeat': {
        const parsedDateArr = value.map(
          (elem: Record<string, string | number>) => ({
            ...elem,
            addedAt: new Date(elem.addedAt)
          })
        );
        return parsedDateArr;
      }

      default:
        return value;
    }
  });

  if (!isValidProgressJson(parsed)) {
    throw new Error('Invalid JSON structure');
  }

  return parsed;
};

/**
 * Merges the provided words for repeat with the existing words in the database.
 *
 * This function compares the provided `importedWords` with the existing words in the
 * database, and updates the database with any new or more recent words for repeat.
 *
 * @param importedWords - An array of `WordsForRepeat` objects representing the words to be imported.
 * @returns A Promise that resolves when the merge operation is complete.
 */
const mergeWordsForRepeat = async (importedWords: WordsForRepeat[]) => {
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

async function processImportV1(jsonString: string) {
  const importedData = parseImportedData(jsonString);

  if (!importedData.completedSets.every(isValidCompletedSet)) {
    throw new Error('Invalid "completed sets" data');
  }

  if (!importedData.wordsForRepeat.every(isValidWordForRepeat)) {
    throw new Error('Invalid "words for repeat" data');
  }

  const setsMergePromise = mergeCompletedSets(importedData.completedSets);
  const wordsMergePromise = mergeWordsForRepeat(importedData.wordsForRepeat);
  recordUserId(importedData.userId);
  await Promise.all([setsMergePromise, wordsMergePromise]);
}

export default processImportV1;
