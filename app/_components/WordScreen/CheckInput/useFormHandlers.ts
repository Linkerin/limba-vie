import { useCallback, useMemo, useState } from 'react';

import {
  getArticle,
  normalizeWord,
  removePunctuationAtEdges
} from '@/app/_lib/utils/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import useWordReviewHandlers from '@/app/_hooks/useWordReviewHandlers';

export type ResultStatus = 'success' | 'error' | null;

interface UseFormHandlersParams {
  gender: Tables<'words'>['gender_ro'];
  plural: Tables<'words'>['plural'];
  wordId: Tables<'words'>['id'];
  wordRo: Tables<'words'>['ro'];
}

function useFormHandlers({
  gender,
  plural,
  wordId,
  wordRo
}: UseFormHandlersParams) {
  const [input, setInput] = useState('');
  const [resultStatus, setResultStatus] = useState<ResultStatus>(null);

  const { correctHandler, incorrectHandler } = useWordReviewHandlers({
    wordId
  });

  const answer = useMemo(() => {
    const normalizedWord = normalizeWord(wordRo);
    const article = getArticle(gender, plural);
    const normalizedRemovedPunctuation =
      removePunctuationAtEdges(normalizedWord);

    const normalizedWithArticle = article
      ? `${article} ${normalizedWord}`
      : null;
    const originalWithArticle = article ? `${article} ${wordRo}` : wordRo;

    const result = {
      word: normalizedWord,
      withArticle: normalizedWithArticle,
      removedPunctuation: normalizedRemovedPunctuation,
      original: originalWithArticle
    };

    return result;
  }, [wordRo, gender, plural]);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      const { value } = e.currentTarget;

      setInput(value);
    }, []);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();

      const normalizedInput = normalizeWord(input);
      const removedPunctuationInput = removePunctuationAtEdges(normalizedInput);

      if (
        normalizedInput === answer.word ||
        normalizedInput === answer.withArticle ||
        removedPunctuationInput === answer.removedPunctuation
      ) {
        setResultStatus('success');
        correctHandler();
        return;
      }

      setResultStatus('error');
      incorrectHandler();

      return;
    },
    [answer, input, correctHandler, incorrectHandler]
  );

  return {
    originalWord: answer.original,
    input,
    resultStatus,
    onChangeHandler,
    onSubmitHandler
  };
}

export default useFormHandlers;
