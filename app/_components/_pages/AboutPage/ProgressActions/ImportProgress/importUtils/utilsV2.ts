import db, {
  type CompletedSet,
  type WordsLearned
} from '../../../../../../_lib/db';
import { mergeCompletedSets } from './importProgress';
import type { ProgressV2 } from '@/app/_lib/types';
import { recordUserId } from './importProgress';
import { WORD_LEVELS } from '@/app/_lib/constants';

/**
 * Validates whether the provided `data` object is a valid `Progress` object.
 *
 * @param data - The object to validate.
 * @returns `true` if the `data` object is valid, `false` otherwise.
 */
const isValidProgressJsonV2 = (data: any): data is ProgressV2 => {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(data.completedSets) &&
    Array.isArray(data.practices) &&
    Array.isArray(data.wordsLearned) &&
    data.created instanceof Date &&
    !isNaN(data.created.valueOf()) &&
    typeof data.version === 'number' &&
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
    typeof set.wordsNum === 'number' &&
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
const isValidWordLearned = (word: any): word is WordsLearned => {
  return (
    typeof word === 'object' &&
    word !== null &&
    typeof word.wordId === 'number' &&
    typeof word.correctAtCurrLevel === 'number' &&
    typeof word.mistakenLastTime === 'boolean' &&
    WORD_LEVELS.includes(word.level) &&
    word.addedAt instanceof Date &&
    !isNaN(word.addedAt.valueOf()) &&
    word.reviewedAt instanceof Date &&
    !isNaN(word.reviewedAt.valueOf())
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
const parseImportedData = (jsonStr: string): ProgressV2 => {
  const parsed = JSON.parse(jsonStr, (key, value) => {
    const keyAttr = key as keyof ProgressV2;
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

      case 'wordsLearned': {
        const parsedDateArr = value.map(
          (elem: Record<string, string | number>) => ({
            ...elem,
            addedAt: new Date(elem.addedAt),
            reviewedAt: new Date(elem.reviewedAt)
          })
        );
        return parsedDateArr;
      }

      case 'practices': {
        const parsedDateArr = value.map(
          (elem: Record<string, string | number>) => ({
            ...elem,
            completedAt: new Date(elem.completedAt)
          })
        );
        return parsedDateArr;
      }

      default:
        return value;
    }
  });

  if (!isValidProgressJsonV2(parsed)) {
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
const mergeWordsLearned = async (importedWords: WordsLearned[]) => {
  const importedIds = importedWords.map(word => word.wordId);
  const existingWords = await db.wordsLearned.bulkGet(importedIds);
  const wordsForWriting: WordsLearned[] = [];

  for (let i = 0; i < importedWords.length; i++) {
    const importedWord: WordsLearned = importedWords[i];
    const existingWord = existingWords[i];

    if (!existingWord || importedWord.reviewedAt > existingWord.reviewedAt) {
      wordsForWriting.push(importedWord);
    }
  }

  await db.wordsLearned.bulkPut(wordsForWriting);
};

async function processImportV2(jsonString: string) {
  const importedData = parseImportedData(jsonString);

  if (!importedData.completedSets.every(isValidCompletedSet)) {
    throw new Error('Invalid "completed sets" data');
  }

  if (!importedData.wordsLearned.every(isValidWordLearned)) {
    throw new Error('Invalid "wordsLearned" data');
  }

  const setsMergePromise = mergeCompletedSets(importedData.completedSets);
  const wordsMergePromise = mergeWordsLearned(importedData.wordsLearned);
  recordUserId(importedData.userId);
  await Promise.all([setsMergePromise, wordsMergePromise]);
}

export default processImportV2;
