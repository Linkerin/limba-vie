import {
  AUDIO_FILE_FORMAT,
  CLOUDINARY_IMG_URL,
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

export function getWordsImageUrl(
  imgName: Tables<'words'>['img_name'],
  width: number = 480
) {
  const url = `${CLOUDINARY_IMG_URL}/f_auto,q_75,w_${width}/v1/limba/${imgName}`;

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

export function getRandomValueFromArr(arr: any[]) {
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
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
