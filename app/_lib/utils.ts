import {
  AUDIO_FILE_FORMAT,
  CLOUDINARY_IMG_URL,
  REPORT_TYPES,
  SUPABASE_STORAGE_URL
} from './constants';
import type { Gender } from './types';
import type { Tables } from './supabase.types';

/**
 * Shuffles the elements of an array in a random order.
 * @param arr - The array to be shuffled.
 * @returns The shuffled array.
 */
export function shuffleArr<T>(arr: T[]): T[] {
  const shuffledArr = [...arr];

  shuffledArr.reverse().forEach((_, i) => {
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

export function getFullGender(genderAbbr: Gender) {
  if (!genderAbbr) return null;

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

interface GetImgUrlOptions {
  folder?: string;
  format?: 'auto' | 'png' | 'svg' | 'webp';
  q?: number | 'auto';
  sanitize?: boolean;
}

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

export function getAudioUrl({
  audioName,
  folders = 'ro',
  format = AUDIO_FILE_FORMAT
}: GetAudioUrlParams) {
  const route = format === 'mp3' ? 'mp3/' + folders : folders;
  const url = `${SUPABASE_STORAGE_URL}/audio/${route}/${audioName}.${format}`;

  return url;
}

export function getRandomValueFromArr(arr: any[]) {
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
}

export function isUserReportRecord(
  record: any
): record is Tables<'user_reports'> {
  if (
    !record.type ||
    typeof record.type !== 'string' ||
    !REPORT_TYPES.includes(record.type)
  ) {
    return false;
  }

  if (
    typeof record.comment !== 'undefined' &&
    typeof record.comment !== 'string'
  ) {
    return false;
  }

  if (
    typeof record.word_id !== 'undefined' &&
    typeof record.word_id !== 'number' &&
    record.word_id !== null
  ) {
    return false;
  }

  if (typeof record.word_id === 'number' && isNaN(record.word_id)) {
    return false;
  }

  if (
    typeof record.grammar_article !== 'undefined' &&
    typeof record.grammar_article !== 'string' &&
    record.grammar_article !== null
  ) {
    return false;
  }

  if (
    typeof record.user_id !== 'undefined' &&
    typeof record.user_id !== 'string' &&
    record.user_id !== null
  ) {
    return false;
  }

  if (
    typeof record.created_at !== 'undefined' &&
    typeof record.created_at !== 'string'
  ) {
    return false;
  }

  if (
    typeof record.updated_at !== 'undefined' &&
    typeof record.updated_at !== 'string'
  ) {
    return false;
  }

  if (
    typeof record.word_id === 'number' &&
    typeof record.grammar_article === 'string'
  ) {
    return false;
  }

  return true;
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
