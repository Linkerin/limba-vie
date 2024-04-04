import { Gender } from './types';

export function shuffleArr(arr: any[]) {
  arr.reverse().forEach((_, index) => {
    const j = Math.floor(Math.random() * (index + 1));
    [arr[index], arr[j]] = [arr[j], arr[index]];
  });

  return arr;
}

export function capitalizeWord(word: string) {
  if (typeof word === 'undefined' || word.length <= 0) return null;

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
