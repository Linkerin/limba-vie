import { useCallback, useState } from 'react';

import type { AnswerObj } from './getAnswerObj';
import {
  getLearnedWord,
  recordLearnedWord,
  updateLearnedWord
} from '@/app/_services/dexie/queries/learnedWords';
import {
  normalizeWord,
  removePunctuationAtEdges
} from '@/app/_lib/utils/utils';
import type { Tables } from '@/app/_services/supabase/supabase.types';
import {
  useIncrementMistakesCorrected,
  useIncrementMistakesMade
} from '@/app/_hooks/useSetProvider';
import type { WordsLearned } from '@/app/_services/dexie/db';

type WordId = Tables<'words'>['id'];

async function correctHandler(wordId: WordId) {
  const word = await getLearnedWord(wordId);
  const result = { isMistakeCorrected: false };

  if (!word) {
    await recordLearnedWord({ wordId, level: 1 });

    return result;
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

  if (word.mistakenLastTime) {
    result.isMistakeCorrected = true;
  }

  return result;
}

async function incorrectHandler(wordId: WordId) {
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

  return;
}

export type ResultStatus = 'success' | 'error' | null;

function useFormHandlers(wordId: WordId, answer: AnswerObj) {
  const [input, setInput] = useState('');
  const [resultStatus, setResultStatus] = useState<ResultStatus>(null);

  const incrementMistakesMade = useIncrementMistakesMade();
  const incrementMistakesCorrected = useIncrementMistakesCorrected();

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      const { value } = e.currentTarget;

      setInput(value);
    }, []);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    async e => {
      e.preventDefault();

      const normalizedInput = normalizeWord(input);
      const removedPunctuationInput = removePunctuationAtEdges(normalizedInput);

      if (
        normalizedInput === answer.word ||
        normalizedInput === answer.withArticle ||
        removedPunctuationInput === answer.removedPunctuation
      ) {
        setResultStatus('success');
        const { isMistakeCorrected } = await correctHandler(wordId);
        if (isMistakeCorrected) {
          incrementMistakesCorrected();
        }

        return;
      }

      setResultStatus('error');
      await incorrectHandler(wordId);
      incrementMistakesMade();

      return;
    },
    [answer, input, wordId, incrementMistakesCorrected, incrementMistakesMade]
  );

  return {
    input,
    resultStatus,
    onChangeHandler,
    onSubmitHandler
  };
}

export default useFormHandlers;
