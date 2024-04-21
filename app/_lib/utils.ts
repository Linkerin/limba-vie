import { Gender } from './types';

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

export function getArticle(gender: Gender) {
  if (!gender) return null;

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
