'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

import AudioBtn from '../../AudioBtn/AudioBtn';
import Finished from '../../WordScreen/Finished/Finished';
import SentenceLoading from '../../WordScreen/Sentence/SentenceLoading';
import type { Tables } from '@/app/_lib/supabase.types';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from '../../WordScreen/Word/Word';
import WordCounter from '../../WordScreen/WordCounter/WordCounter';
import WordImg from '../../WordScreen/WordImg/WordImg';

import styles from './SetPage.module.css';

const Actions = dynamic(() => import('../../WordScreen/Actions/Actions'));
const CheckInput = dynamic(() => import('../../CheckInput/CheckInput'));
const Sentence = dynamic(() => import('../../WordScreen/Sentence/Sentence'), {
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

export interface SetPageProps {
  words: Word[];
  setName?: string;
  checkPage?: boolean;
}

function SetPage({ words, setName, checkPage }: SetPageProps) {
  const [currWord, setCurrWord] = useState(0);
  const [showExample, setShowExample] = useState(false);

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
      {currWord < words.length && words.at(currWord) && (
        <>
          <WordCounter current={currWord + 1} total={words.length} />
          <WordImg
            key={words[currWord].img_name}
            wordEn={words[currWord].en}
            gender={words[currWord].gender_ro}
            imgName={words[currWord].img_name}
          />
          {checkPage ? (
            <AudioBtn
              key={words[currWord].ro}
              className={styles['check-audio-btn']}
              audioName={words[currWord].audio_name}
              word={words[currWord].ro}
              autoplay={false}
            />
          ) : (
            <Word
              word={words[currWord].ro}
              plural={words[currWord].plural}
              gender={words[currWord].gender_ro}
            >
              <AudioBtn
                audioName={words[currWord].audio_name}
                word={words[currWord].ro}
              />
            </Word>
          )}
          {showExample && <Sentence wordId={words[currWord].id} />}
          {checkPage ? (
            <CheckInput
              key={words[currWord].id}
              gender={words[currWord].gender_ro}
              plural={words[currWord].plural}
              setCurrWord={nextWord}
              wordId={words[currWord].id}
              wordRo={words[currWord].ro}
            />
          ) : (
            <Actions
              exampleClickHandler={exampleClickHandler}
              setCurrWord={nextWord}
              wordId={words[currWord].id}
            />
          )}
        </>
      )}
      {currWord >= words.length && (
        <Finished
          setId={words.at(0)?.sets?.id}
          setName={setName ?? words[0].sets?.set}
        />
      )}
    </section>
  );
}

export default SetPage;
