'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import AudioBtn from '../../AudioBtn/AudioBtn';
import Finished from '../../WordScreen/Finished/Finished';
import SentenceLoading from '../../WordScreen/Sentence/SentenceLoading';
import { shuffleArr } from '@/app/_lib/utils';
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

  const shuffled = useMemo(() => shuffleArr(words), [words]);

  const exampleClickHandler = useCallback(() => {
    setShowExample(prevState => !prevState);
  }, []);

  const nextWord = useCallback(() => {
    setShowExample(false);
    setCurrWord(prevState => prevState + 1);
  }, []);

  useMediaLoad(currWord, shuffled);

  return (
    <section className={styles.section}>
      {currWord < shuffled.length && shuffled.at(currWord) && (
        <>
          <WordCounter current={currWord + 1} total={shuffled.length} />
          <WordImg
            wordEn={shuffled[currWord].en}
            gender={shuffled[currWord].gender_ro}
            imgName={shuffled[currWord].img_name}
          />
          {checkPage ? (
            <AudioBtn
              key={shuffled[currWord].ro}
              className={styles['check-audio-btn']}
              audioName={shuffled[currWord].audio_name}
              word={shuffled[currWord].ro}
              autoplay={false}
            />
          ) : (
            <Word
              word={shuffled[currWord].ro}
              plural={shuffled[currWord].plural}
              gender={shuffled[currWord].gender_ro}
            >
              <AudioBtn
                audioName={shuffled[currWord].audio_name}
                word={shuffled[currWord].ro}
              />
            </Word>
          )}
          {showExample && <Sentence wordId={shuffled[currWord].id} />}
          {checkPage ? (
            <CheckInput
              key={shuffled[currWord].id}
              gender={shuffled[currWord].gender_ro}
              plural={shuffled[currWord].plural}
              setCurrWord={nextWord}
              wordId={shuffled[currWord].id}
              wordRo={shuffled[currWord].ro}
            />
          ) : (
            <Actions
              exampleClickHandler={exampleClickHandler}
              setCurrWord={nextWord}
              wordId={shuffled[currWord].id}
            />
          )}
        </>
      )}
      {currWord >= shuffled.length && (
        <Finished
          setId={shuffled.at(0)?.sets?.id}
          setName={setName ?? shuffled[0].sets?.set}
        />
      )}
    </section>
  );
}

export default SetPage;
