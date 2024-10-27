import { describe, expect, test } from 'vitest';

import {
  capitalizeWord,
  getAudioUrl,
  getFullGender,
  getImageUrl,
  type GetImgUrlOptions,
  getRandomValueFromArr,
  isSetCompleted,
  isUserReportRecord,
  normalizeWord,
  removePunctuationAtEdges,
  shuffleArr,
  trimVerb
} from './utils';
import { CLOUDINARY_IMG_URL, SUPABASE_STORAGE_URL } from '../constants';

describe('capitalizeWord', () => {
  test('should capitalize the first letter of a word', () => {
    const result = capitalizeWord('hello');
    expect(result).toBe('Hello');
  });

  test('should return the same word when the first letter is already capitalized', () => {
    const result = capitalizeWord('Hello');
    expect(result).toBe('Hello');
  });

  test('should capitalize a single lowercase letter', () => {
    const result = capitalizeWord('a');
    expect(result).toBe('A');
  });

  test('should return null for an empty string input', () => {
    const result = capitalizeWord('');
    expect(result).toBeNull();
  });

  test('should capitalize the first word when the string has multiple words', () => {
    const result = capitalizeWord('hello world');
    expect(result).toBe('Hello world');
  });

  test('should not mutate the original input string', () => {
    const input = 'hello';
    const originalInput = input;
    capitalizeWord(input);
    expect(input).toBe(originalInput);
  });
});

describe('getAudioUrl', () => {
  const audioName = 'sample-audio';

  test('should generate URL with default options', () => {
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/ro/${audioName}.aac`;
    const result = getAudioUrl({ audioName });
    expect(result).toBe(expectedUrl);
  });

  test('should generate URL with specified folders', () => {
    const folders = 'en';
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/${folders}/${audioName}.aac`;
    const result = getAudioUrl({ audioName, folders });
    expect(result).toBe(expectedUrl);
  });

  test('should generate URL with specified format', () => {
    const format = 'mp3';
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/${format}/ro/${audioName}.${format}`;
    const result = getAudioUrl({ audioName, format });
    expect(result).toBe(expectedUrl);
  });

  test('should generate URL with specified format and folder', () => {
    const format = 'mp3';
    const folders = 'en';
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/${format}/${folders}/${audioName}.${format}`;
    const result = getAudioUrl({ audioName, folders, format });
    expect(result).toBe(expectedUrl);
  });

  test('should handle empty audio name', () => {
    const emptyName = '';
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/ro/.aac`;
    const result = getAudioUrl({ audioName: emptyName });
    expect(result).toBe(expectedUrl);
  });

  test('should process undefined folder parameter correctly', () => {
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/ro/${audioName}.aac`;
    const result = getAudioUrl({ audioName, folders: undefined });
    expect(result).toBe(expectedUrl);
  });

  test('should manage undefined format parameter correctly', () => {
    const expectedUrl = `${SUPABASE_STORAGE_URL}/audio/ro/${audioName}.aac`;
    const result = getAudioUrl({ audioName, format: undefined });
    expect(result).toBe(expectedUrl);
  });

  test('should manage undefined format parameter correctly', () => {
    const invalidFormat = 'wav';
    // @ts-expect-error
    expect(() => getAudioUrl({ audioName, format: invalidFormat })).toThrow(
      `Invalid audio format provided: ${invalidFormat}`
    );
  });
});

describe('getFullGender', () => {
  test('should return the full gender name for a valid input', () => {
    const masc = getFullGender('m');
    expect(masc).toBe('masculin');

    const fem = getFullGender('f');
    expect(fem).toBe('feminin');

    const neutru = getFullGender('n');
    expect(neutru).toBe('neutru');
  });

  test('should return null for a null input', () => {
    const result = getFullGender(null);
    expect(result).toBeNull();
  });

  test('should return null for an invalid input', () => {
    // @ts-expect-error
    const invalidLetter = getFullGender('x');
    expect(invalidLetter).toBeNull();

    // @ts-expect-error
    const emptyStr = getFullGender('');
    expect(emptyStr).toBeNull();

    // @ts-expect-error
    const undefinedInput = getFullGender(undefined);
    expect(undefinedInput).toBeNull();
  });
});

describe('getImageUrl', () => {
  const imgName = 'sample-image';

  test('should generate URL with default', () => {
    const expectedUrl = `${CLOUDINARY_IMG_URL}/f_auto,q_80,w_480/v1/limba/${imgName}`;
    const result = getImageUrl(imgName);
    expect(result).toBe(expectedUrl);
  });

  // Constructs URL with specified image name and width
  test('should construct URL with specified image name and width', () => {
    const width = 600;
    const expectedUrl = `${CLOUDINARY_IMG_URL}/f_auto,q_80,w_${width}/v1/limba/${imgName}`;
    const result = getImageUrl(imgName, width);
    expect(result).toBe(expectedUrl);
  });

  test('should generate a URL for an image with custom options', () => {
    const width = 100;
    const options: GetImgUrlOptions = {
      folder: 'test',
      format: 'png',
      q: 50,
      sanitize: true
    };
    const result = getImageUrl(imgName, width, options);
    const expectedUrl = `${CLOUDINARY_IMG_URL}/f_${options.format},q_${options.q},w_${width},fl_sanitize/v1/${options.folder}/${imgName}`;

    expect(result).toBe(expectedUrl);
  });

  test('should handle empty string as image name', () => {
    const imgName = '';
    const expectedUrl = `${CLOUDINARY_IMG_URL}/f_auto,q_80,w_480/v1/limba/`;
    const result = getImageUrl(imgName);
    expect(result).toBe(expectedUrl);
  });

  test('should process undefined or null options gracefully', () => {
    const imgName = 'sample-image';
    const expectedUrl = `${CLOUDINARY_IMG_URL}/f_auto,q_80,w_480/v1/limba/${imgName}`;
    const resultWithUndefined = getImageUrl(imgName, 480, undefined);
    // @ts-expect-error
    const resultWithNull = getImageUrl(imgName, 480, null);
    expect(resultWithUndefined).toBe(expectedUrl);
    expect(resultWithNull).toBe(expectedUrl);
  });
});

describe('getRandomValueFromArr', () => {
  test('should return a random value from the provided array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = getRandomValueFromArr(arr);

    expect(arr).toContain(result);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5);
  });

  test('should return the only element when the array has a single element', () => {
    const arr = [42];
    const result = getRandomValueFromArr(arr);
    expect(result).toBe(42);
  });

  test('should handle arrays with different data types correctly', () => {
    const arr = [1, 'string', true, null, undefined];
    const result = getRandomValueFromArr(arr);
    expect(arr).toContain(result);
  });
});

describe('isSetCompleted', () => {
  test('should return true when localWordsNum is greater than or equal to dbWordsNum', () => {
    const equalResult = isSetCompleted(10, 10);
    const greaterResult = isSetCompleted(10, 11);

    expect(equalResult).toBe(true);
    expect(greaterResult).toBe(true);
  });

  test('should return false when localWordsNum is less than dbWordsNum', () => {
    const result = isSetCompleted(10, 9);
    expect(result).toBe(false);
  });

  test('should return true when localWordsNum is -1', () => {
    const result = isSetCompleted(10, -1);
    expect(result).toBe(true);
  });

  test('should return false when localWordsNum is null or undefined', () => {
    const nullResult = isSetCompleted(10, null);
    const undefinedResult = isSetCompleted(10, undefined);

    expect(nullResult).toBe(false);
    expect(undefinedResult).toBe(false);
  });

  test('should return false when dbWordsNum is null', () => {
    const result = isSetCompleted(null, 10);
    expect(result).toBe(false);
  });
});

describe('isUserReportRecord', () => {
  test('should return true for a valid record', () => {
    const record = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 123,
      user_id: 'user123',
      created_at: '2023-10-01T00:00:00Z',
      updated_at: '2023-10-02T00:00:00Z'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(true);
  });

  test('should return true for a record with only mandatory fields correctly typed', () => {
    const record = {
      type: 'incorrect_ro'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(true);
  });

  test('should return true for a record with optional fields set to undefined', () => {
    const record = {
      type: 'incorrect_ro',
      comment: undefined,
      word_id: undefined,
      grammar_article: undefined,
      user_id: undefined,
      created_at: undefined,
      updated_at: undefined
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(true);
  });

  test('should return true for a record with null values for nullable fields', () => {
    const record = {
      type: 'incorrect_ro',
      word_id: null,
      grammar_article: null,
      user_id: null
    };
    expect(isUserReportRecord(record)).toBe(true);
  });

  test('should return false when the record is missing a required field', () => {
    const record: any = {
      comment: 'This is a comment',
      word_id: 42
    };

    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false when the record has an invalid type', () => {
    const record: any = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 42,
      user_id: 'user-id',
      invalidField: 'invalidValue'
    };

    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false when the record both word_id and grammar_article', () => {
    const record: any = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 42,
      grammar_article: 'This is an article',
      user_id: 'user-id',
      invalidField: 'invalidValue'
    };

    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with type not in REPORT_TYPES', () => {
    const record = {
      type: 'invalid_type'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with word_id as NaN', () => {
    const record = {
      type: 'incorrect_ro',
      word_id: NaN
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with created_at as a non-string', () => {
    const record = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 123,
      created_at: 12345,
      updated_at: '2023-10-02T00:00:00Z'
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });

  test('should return false for a record with updated_at as a non-string', () => {
    const record = {
      type: 'incorrect_ro',
      comment: 'This is a comment',
      word_id: 123,
      created_at: '2023-10-01T00:00:00Z',
      updated_at: 12345
    };
    const result = isUserReportRecord(record);
    expect(result).toBe(false);
  });
});

describe('normalizeWord', () => {
  test('should normalize a word by removing diacritics and converting it to lowercase', () => {
    const input = 'Știri';
    const expectedOutput = 'stiri';
    const result = normalizeWord(input);
    expect(result).toBe(expectedOutput);
  });

  test('should convert uppercase letters to lowercase', () => {
    const result = normalizeWord('HELLO');
    expect(result).toBe('hello');
  });

  test('should remove leading and trailing whitespace', () => {
    const result = normalizeWord('  hello  ');
    expect(result).toBe('hello');
  });

  test('should handle an empty string', () => {
    const result = normalizeWord('');
    expect(result).toBe('');
  });

  test('should process a string with only whitespace correctly', () => {
    const result = normalizeWord('   ');
    expect(result).toBe('');
  });

  test('should manage a string with only diacritical marks', () => {
    const result = normalizeWord('\u0301\u0300');
    expect(result).toBe('');
  });

  test('should process a string with mixed case and diacritical marks', () => {
    const result = normalizeWord('CaféÉ');
    expect(result).toBe('cafee');
  });
});

describe('removePunctuationAtEdges', () => {
  test('should remove punctuation from the beginning of a string', () => {
    const result = removePunctuationAtEdges('...Hello');
    expect(result).toBe('Hello');
  });

  test('should remove punctuation from the end of a string', () => {
    const result = removePunctuationAtEdges('Hello...');
    expect(result).toBe('Hello');
  });

  test('should remove punctuation at the beginning and end of the input string', () => {
    const input = '...Hello...!';
    const result = removePunctuationAtEdges(input);
    expect(result).toBe('Hello');
  });

  test('should handle an empty string', () => {
    const result = removePunctuationAtEdges('');
    expect(result).toBe('');
  });

  test('should trim whitespace from the resulting string', () => {
    const result = removePunctuationAtEdges('  Hello  ');
    expect(result).toBe('Hello');
  });

  test('should handle a string with punctuation marks only', () => {
    const result = removePunctuationAtEdges(' !@#$%^&*()_');
    expect(result).toBe('');
  });

  test('should handle a string with punctuation in the middle', () => {
    const result = removePunctuationAtEdges('Hello, world! How are you?');
    expect(result).toBe('Hello, world! How are you');
  });

  test('should process strings without punctuation correctly', () => {
    const result = removePunctuationAtEdges('Hello');
    expect(result).toBe('Hello');
  });
});

describe('shuffleArr', () => {
  test('should shuffle an array of numbers correctly', async () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffleArr(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    await expect.poll(() => shuffleArr(arr), { interval: 2 }).not.toEqual(arr);
  });

  test('should shuffle an array of strings correctly', async () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const shuffledArr = shuffleArr(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    await expect.poll(() => shuffleArr(arr), { interval: 2 }).not.toEqual(arr);
  });

  test('should shuffle an array of objects correctly', async () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const shuffledArr = shuffleArr(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    await expect.poll(() => shuffleArr(arr), { interval: 2 }).not.toEqual(arr);
  });

  test('should handle an array with duplicate elements correctly', async () => {
    const arr = [1, 2, 2, 3, 3];
    const shuffledArr = shuffleArr(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    await expect.poll(() => shuffleArr(arr), { interval: 2 }).not.toEqual(arr);
  });

  test('should shuffle an array with mixed data types correctly', async () => {
    const arr = [1, 'two', true, { key: 'value' }, [5]];
    const shuffledArr = shuffleArr(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    await expect.poll(() => shuffleArr(arr), { interval: 2 }).not.toEqual(arr);
  });

  test('should shuffle an array immutably', () => {
    const arr = [1, 2, 3, 4, 5];
    const originalArr = [...arr];
    shuffleArr(arr);
    expect(arr).toEqual(originalArr);
  });

  test('should handle an array with one element without errors', () => {
    const arr = [42];
    const shuffledArr = shuffleArr(arr);
    expect(shuffledArr).toHaveLength(1);
    expect(shuffledArr).toEqual([42]);
  });

  test('should return the same array if it is empty', () => {
    const arr: number[] = [];
    const result = shuffleArr(arr);
    expect(result).toEqual(arr);
  });
});

describe('trimVerb', () => {
  test('should trim a valid Romanian verb', () => {
    const result = trimVerb('a scrie', null);
    expect(result).toBe('scrie');
  });

  test('should trim a verb when gender in undefined', () => {
    // @ts-expect-error
    const undefinedResult = trimVerb('a vedea', undefined);

    expect(undefinedResult).toBe('vedea');
  });

  test('should return word unchanged when gender is truthy', () => {
    const result = trimVerb('a merge', 'm');
    expect(result).toBe('a merge');
  });
});
