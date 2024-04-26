'use client';

import { useCallback, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';

export interface ActionsProps {
  wordId: Tables<'words'>['id'];
  wordRo: Tables<'words'>['ro'];
  setCurrWord: () => void;
}

interface ExampleSentences {
  en: string;
  ro: string;
}

type ExamplesState = 'loading' | 'loaded' | 'error' | null;

const key = LOCAL_STORAGE_KEYS.repeatWords;

function useActionHandlers({ setCurrWord, wordId, wordRo }: ActionsProps) {
  const [examplesState, setExamplesState] = useState<ExamplesState>(null);
  const [sentences, setSentences] = useState<ExampleSentences>({
    en: '',
    ro: ''
  });

  const exampleClickhandler: React.MouseEventHandler = useCallback(
    async e => {
      e.preventDefault();

      if (examplesState === null) {
        if (sentences.ro.length > 0) {
          setExamplesState('loaded');
          return;
        }

        try {
          setExamplesState('loading');
          const res = await fetch(`/api/get-example-sentence?word=${wordRo}`);
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data);
          }

          const result = await res.json();

          if (result?.en?.length > 0 && result?.ro?.length > 0) {
            setSentences(result);
            setExamplesState('loaded');
          }

          return;
        } catch (err) {
          console.error(err);
          setExamplesState('error');

          return;
        }
      }

      setExamplesState(null);
      return;
    },
    [wordRo, examplesState, sentences.ro.length]
  );

  const repeatClickHandler: React.MouseEventHandler = useCallback(
    e => {
      setCurrWord();

      const repeatWordsStr = ssrLocalStorage.getItem(key);
      if (!repeatWordsStr) {
        ssrLocalStorage.setItem(key, JSON.stringify({ [wordId]: 3 }));

        return;
      }

      const repeatWords = JSON.parse(repeatWordsStr);

      const updatedRepeatWords = { ...repeatWords, [wordId]: 3 };
      ssrLocalStorage.setItem(key, JSON.stringify(updatedRepeatWords));

      return;
    },
    [setCurrWord, wordId]
  );

  const learnedСlickHandler: React.MouseEventHandler = useCallback(
    e => {
      setCurrWord();
      const repeatWordsStr = ssrLocalStorage.getItem(key);

      if (!repeatWordsStr) return;

      const repeatWords = JSON.parse(repeatWordsStr);
      if (!repeatWords[wordId]) return;

      if (repeatWords[wordId] <= 1) {
        const filteredArrOfRepeatWords = Object.entries(repeatWords).filter(
          ([key, _]) => key !== wordId.toString()
        );

        let updatedRepeatWords = Object.fromEntries(filteredArrOfRepeatWords);
        ssrLocalStorage.setItem(key, JSON.stringify(updatedRepeatWords));

        return;
      }

      const updatedRepeatWords = {
        ...repeatWords,
        [wordId]: repeatWords[wordId] - 1
      };
      ssrLocalStorage.setItem(key, JSON.stringify(updatedRepeatWords));

      return;
    },
    [setCurrWord, wordId]
  );

  return {
    examplesState,
    sentences,
    exampleClickhandler,
    learnedСlickHandler,
    repeatClickHandler
  };
}

export default useActionHandlers;
