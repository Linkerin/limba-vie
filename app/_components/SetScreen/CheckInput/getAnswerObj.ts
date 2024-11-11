import {
  getArticle,
  normalizeWord,
  removePunctuationAtEdges
} from '@/app/_lib/utils/utils';
import type { Tables } from '@/app/_services/supabase/supabase.types';

interface GetAnswerParams {
  gender: Tables<'words'>['gender_ro'];
  plural: Tables<'words'>['plural'];
  wordRo: Tables<'words'>['ro'];
}

function getAnswer({ gender, plural, wordRo }: GetAnswerParams) {
  const normalizedWord = normalizeWord(wordRo);
  const article = getArticle(gender, plural);
  const normalizedRemovedPunctuation = removePunctuationAtEdges(normalizedWord);

  const normalizedWithArticle = article ? `${article} ${normalizedWord}` : null;
  const originalWithArticle = article ? `${article} ${wordRo}` : wordRo;

  const result = {
    word: normalizedWord,
    withArticle: normalizedWithArticle,
    removedPunctuation: normalizedRemovedPunctuation,
    original: originalWithArticle
  };

  return result;
}

export type AnswerObj = ReturnType<typeof getAnswer>;

export default getAnswer;
