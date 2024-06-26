'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import AudioBtn from '../../_ui/AudioBtn/AudioBtn';
import Finished from '../../WordScreen/Finished/Finished';
import Sentence from '../../Word/Sentence/Sentence';
import { shuffleArr } from '@/app/_lib/utils';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from '../../Word/Word/Word';
import WordCounter from '../../WordScreen/WordCounter/WordCounter';
import WordImg from '../../Word/WordImg/WordImg';
import type { RepeatWords, SetInfo, Words } from '@/app/_services/dbFetchers';

import styles from './SetPage.module.css';

const Actions = dynamic(() => import('../../WordScreen/Actions/Actions'));
const CheckInput = dynamic(
  () => import('../../WordScreen/CheckInput/CheckInput')
);

export interface SetPageProps {
  words: Words | RepeatWords;
  checkPage?: boolean;
  setInfo?: SetInfo;
  setName?: string;
}

function SetPage({ words, checkPage, setInfo, setName }: SetPageProps) {
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
          <div className={styles['word-container']}>
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
          </div>
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
        <Finished setInfo={setInfo} setName={setName} />
      )}
    </section>
  );
}

export default SetPage;
