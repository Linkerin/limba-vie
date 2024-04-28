'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

import Actions from './Actions/Actions';
import Finished from './Finished/Finished';
import SentenceLoading from './Sentence/SentenceLoading';
import type { Tables } from '@/app/_lib/supabase.types';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from './Word/Word';
import WordImg from './WordImg/WordImg';

import styles from './WordScreen.module.css';

const Sentence = dynamic(() => import('./Sentence/Sentence'), {
  loading: () => <SentenceLoading />
});

interface Sets {
  sets?: Pick<Tables<'sets'>, 'id' | 'set'> | null;
}

type Word = Omit<
  Tables<'words'>,
  'created_at' | 'updated_at' | 'set_id' | 'example_ro' | 'example_en'
> &
  Sets;

export interface WordScreenProps {
  words: Word[];
  setName?: string;
}

function WordScreen({ words, setName }: WordScreenProps) {
  const [currWord, setCurrWord] = useState(0);
  const [showExample, setShowExample] = useState(false);

  const flipHandler: React.MouseEventHandler = useCallback(_ => {}, []);

  const exampleClickHandler = useCallback(() => {
    setShowExample(prevState => !prevState);
  }, []);

  const nextWord = useCallback(() => {
    setShowExample(false);
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
          {showExample && <Sentence wordId={words[currWord].id} />}
          <Actions
            exampleClickHandler={exampleClickHandler}
            setCurrWord={nextWord}
            wordId={words[currWord].id}
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
