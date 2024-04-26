'use client';

import { useCallback, useState } from 'react';

import Actions from './Actions/Actions';
import Finished from './Finished/Finished';
import type { Tables } from '@/app/_lib/supabase.types';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from './Word/Word';
import WordImg from './WordImg/WordImg';

import styles from './WordScreen.module.css';

interface Sets {
  sets?: Pick<Tables<'sets'>, 'id' | 'set'> | null;
}

type Word = Omit<Tables<'words'>, 'created_at' | 'updated_at' | 'set_id'> &
  Sets;

export interface WordScreenProps {
  words: Word[];
  setName?: string;
}

function WordScreen({ words, setName }: WordScreenProps) {
  const [currWord, setCurrWord] = useState(0);

  const flipHandler: React.MouseEventHandler = useCallback(_ => {}, []);

  const nextWord = useCallback(() => {
    setCurrWord(prevState => prevState + 1);
  }, []);

  useMediaLoad(currWord, words);

  return (
    <section className={styles.section}>
      {currWord < words.length && words.at(currWord) ? (
        <>
          <p className={styles.counter}>
            {currWord + 1} / {words.length}
          </p>
          <WordImg
            key={words[currWord].img_name}
            wordEn={words[currWord].en}
            flipHandler={flipHandler}
            gender={words[currWord].gender_ro}
            imgName={words[currWord].img_name}
          />
          <Word
            word={words[currWord].ro}
            plural={words[currWord].plural}
            gender={words[currWord].gender_ro}
            audioName={words[currWord].audio_name}
          />
          <Actions
            key={words[currWord].id}
            setCurrWord={nextWord}
            wordId={words[currWord].id}
            wordRo={words[currWord].ro}
          />
        </>
      ) : (
        <Finished
          setId={words.at(0)?.sets?.id}
          setName={setName ? setName : words[0].sets?.set}
        />
      )}
    </section>
  );
}

export default WordScreen;
