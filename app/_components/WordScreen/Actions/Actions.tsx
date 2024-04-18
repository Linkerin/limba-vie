'use client';

import { useCallback } from 'react';

import ActionBtn from '../../ActionBtn/ActionBtn';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './Actions.module.css';

const key = 'lvRepeatWords';

interface ActionsProps {
  wordId: Tables<'words'>['id'];
  setCurrWord: () => void;
}

function Actions({ setCurrWord, wordId }: ActionsProps) {
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

  return (
    <div className={styles.actions}>
      <ActionBtn variant="repeat" onClick={repeatClickHandler} />
      <ActionBtn variant="learned" onClick={learnedСlickHandler} />
    </div>
  );
}

export default Actions;
