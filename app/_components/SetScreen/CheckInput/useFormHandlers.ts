import { useCallback, useMemo, useState } from 'react';

import {
  getArticle,
  normalizeWord,
  removePunctuationAtEdges
} from '@/app/_lib/utils/utils';
import {
  getLearnedWord,
  recordLearnedWord,
  updateLearnedWord
} from '@/app/_services/dexie/queries/learnedWords';
import type { Tables } from '@/app/_services/supabase/supabase.types';
import type { WordsLearned } from '@/app/_services/dexie/db';

interface UseWordReviewHandlersProps {
  wordId: Tables<'words'>['id'];
}

function useWordReviewHandlers({ wordId }: UseWordReviewHandlersProps) {
  const correctHandler = useCallback(async () => {
    const word = await getLearnedWord(wordId);

    if (!word) {
      await recordLearnedWord({ wordId, level: 1 });
      return;
    }

    let updateData: Partial<WordsLearned> = {
      mistakenLastTime: false,
      reviewedAt: new Date()
    };

    if (word.level > 4 || word.level < 0) {
      throw new Error('Handling correct answer: word level is not valid');
    }

    switch (word.level) {
      case 3:
        if (word.correctAtCurrLevel < 1) {
          updateData.correctAtCurrLevel = 1;
        } else {
          updateData.level = 4;
          updateData.correctAtCurrLevel = 0;
        }
        break;

      case 4:
        updateData.correctAtCurrLevel = word.correctAtCurrLevel + 1;
        break;

      default:
        updateData.level = word.level + 1;
        updateData.correctAtCurrLevel = 0;
        break;
    }

    await updateLearnedWord(wordId, updateData);

    return;
  }, [wordId]);

  const incorrectHandler = useCallback(async () => {
    const word = await getLearnedWord(wordId);

    if (!word) {
      await recordLearnedWord({ wordId, level: 1, mistaken: true });
      return;
    }

    let updateData: Partial<WordsLearned> = {
      correctAtCurrLevel: 0,
      mistakenLastTime: true,
      reviewedAt: new Date()
    };

    if (word.level > 4 || word.level < 0) {
      throw new Error('Handling incorrect answer: word level is not valid');
    }

    switch (word.level) {
      case 0:
        break;

      case 3:
        updateData.level = 1;
        break;

      default:
        updateData.level = word.level - 1;
        break;
    }

    await updateLearnedWord(wordId, updateData);
  }, [wordId]);

  return { correctHandler, incorrectHandler };
}

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
