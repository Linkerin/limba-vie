import {
  AUDIO_FILE_FORMAT,
  CLOUDINARY_IMG_URL,
  REPORT_TYPES,
  SUPABASE_STORAGE_URL
} from '@/app/_lib/constants';
import type { Gender } from '@/app/_lib/types';
import type { Tables } from '@/app/_services/supabase/supabase.types';

/**
 * Shuffles the elements of an array in a random order.
 * @param arr - The array to be shuffled.
 * @throws {Error} If the input is not an array.
 * @returns The new shuffled array.
 */
export function shuffleArr<T>(arr: T[]): T[] {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided to shuffle');
  }

  const shuffledArr = [...arr];

  shuffledArr.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  });

  return shuffledArr;
}

/**
 * Capitalizes the first letter of a word.
 * @param word - The word to be capitalized.
 * @returns The capitalized word.
 */
export function capitalizeWord(word: string) {
  if (!word || word.length === 0) return null;

  return word[0].toUpperCase() + word.slice(1);
}

export function getArticle(gender: Gender, plural: Tables<'words'>['plural']) {
  if (!gender || plural) return null;

  switch (gender) {
    case 'm':
      return 'un';

    case 'n':
      return 'un';

    case 'f':
      return 'o';

    default:
      return null;
  }
}

/**
 * Converts a gender abbreviation to its full name.
 * @param genderAbbr - The gender abbreviation to convert.
 * @returns The full gender name, or `null` if the input is invalid.
 */
export function getFullGender(genderAbbr: Gender) {
  switch (genderAbbr) {
    case 'm':
      return 'masculin';

    case 'n':
      return 'neutru';

    case 'f':
      return 'feminin';

    default:
      return null;
  }
}

export interface GetImgUrlOptions {
  folder?: string;
  format?: 'auto' | 'png' | 'svg' | 'webp';
  q?: number | 'auto';
  sanitize?: boolean;
}

/**
 * Generates a URL for an image asset.
 *
 * @param imgName - The name of the image file, without the file extension.
 * @param width - The desired width of the image, in pixels. Defaults to `480`.
 * @param options - Additional options for the image URL:
 *   - folder: The folder where the image is stored. Defaults to `'limba'`.
 *   - format: The image format. Can be `'auto'`, `'png'`, `'svg'`, or `'webp'`.
 *     Defaults to `'auto'`.
 *   - q: The quality of the image, from 0 to 100, or `'auto'`. Defaults to `80`.
 *   - sanitize: Whether to sanitize the image URL. Defaults to `false`.
 * @returns The generated image URL.
 */
export function getImageUrl(
  imgName: Tables<'words'>['img_name'],
  width: number = 480,
  options: GetImgUrlOptions = {}
) {
  const opt: GetImgUrlOptions = {
    folder: 'limba',
    format: 'auto',
    q: 80,
    sanitize: false,
    ...options
  };

  const url = `${CLOUDINARY_IMG_URL}/f_${opt.format},q_${opt.q},w_${width}${
    opt.sanitize ? ',fl_sanitize' : ''
  }/v1/${opt.folder}/${imgName}`;

  return url;
}

interface GetAudioUrlParams {
  audioName: Tables<'words'>['audio_name'];
  folders?: string;
  format?: 'aac' | 'mp3';
}

/**
 * Generates a URL for an audio asset.
 *
 * @param audioName - The name of the audio file, without the file extension.
 * @param folders - The folder(s) where the audio is stored. Defaults to `'ro'`.
 * @param format - The audio format. Can be `'aac'` or `'mp3'`.
 * @throws {Error} If audio format is not supported.
 * @returns The generated audio URL.
 */
export function getAudioUrl({
  audioName,
  folders = 'ro',
  format = AUDIO_FILE_FORMAT
}: GetAudioUrlParams) {
  const formats = new Set(['aac', 'mp3']);
  if (!formats.has(format)) {
    throw new Error(`Invalid audio format provided: ${format}`);
  }

  const route = format === 'mp3' ? 'mp3/' + folders : folders;
  const url = `${SUPABASE_STORAGE_URL}/audio/${route}/${audioName}.${format}`;

  return url;
}

/**
 * Returns a random value from the provided array.
 * @param arr - The array to select a random value from.
 * @returns A random value from the provided array.
 */
export function getRandomValueFromArr(arr: any[]) {
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
}

/**
 * Checks if the local words count matches the database words count
 * or if the local words count was not initially set:
 * `-1` value means that the set was completed before adding the `wordsNum` field.
 * @param localWordsNum - The number of words in the local storage.
 * @param dbWordsNum - The number of words in the database.
 * @returns A boolean indicating whether the set of words is completed or not.
 */
export function isSetCompleted(
  dbWordsNum: number | null,
  localWordsNum: number | null | undefined
) {
  if (
    typeof localWordsNum === 'undefined' ||
    localWordsNum === null ||
    dbWordsNum === null
  ) {
    return false;
  }

  if (localWordsNum === -1 || localWordsNum >= dbWordsNum) {
    return true;
  }

  return false;
}

/**
 * Normalizes a word by removing diacritics and converting it to lowercase.
 *
 * @param word - The word to be normalized.
 * @returns The normalized word.
 */
export function normalizeWord(word: string) {
  return word
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Removes punctuation at the beginning and end of the input string.
 *
 * @param str - The input string from which punctuation is to be removed.
 * @returns The input string with punctuation removed from the edges and trimmed.
 */
export function removePunctuationAtEdges(str: string): string {
  const removedAtBeginning = str.replace(/^[\p{P}\p{S}]+/gu, '');

  // Removes ellipsis `...` followed by a puctuation mark
  const removedEllipsis = removedAtBeginning.replace(
    /(?:\.\.\. ?)[\p{P}\p{S}]+$/gu,
    ''
  );
  const removedAtEnd = removedEllipsis.replace(/[\p{P}\p{S}]+$/gu, '');

  return removedAtEnd.trim();
}

/**
 * Trims the leading 'a ' from a Romanian verb.
 *
 * @param word - The Romanian word to be trimmed.
 * @param gender - The gender of the Romanian word, if any.
 * @returns The trimmed word.
 */
export const trimVerb = (
  word: Tables<'words'>['ro'],
  gender: Tables<'words'>['gender_ro']
) => {
  let result = word;
  if (!gender && word.slice(0, 2) === 'a ') {
    result = word.slice(2);
  }

  return result;
};
