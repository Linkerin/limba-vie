'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import AudioBtn from '../../_ui/AudioBtn/AudioBtn';
import Finished from '../../WordScreen/Finished/Finished';
import ReportModal from '../../ReportModal/ReportModal';
import Sentence from '../../Word/Sentence/Sentence';
import { shuffleArr } from '@/app/_lib/utils';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from '../../Word/Word/Word';
import WordCounter from '../../WordScreen/WordCounter/WordCounter';
import WordImg from '../../Word/WordImg/WordImg';
import WordPlural from '../../Word/WordPlural/WordPlural';
import type {
  RepeatWords,
  SetInfo,
  SetWords
} from '@/app/_services/dbFetchers';

import {
  audioBtnStyles,
  reportCounterContainerStyles,
  sectionStyles,
  wordContainerStyles
} from './SetPage.styles';

const Actions = dynamic(() => import('../../WordScreen/Actions/Actions'));
const CheckInput = dynamic(
  () => import('../../WordScreen/CheckInput/CheckInput')
);

export interface SetPageProps {
  words: SetWords | RepeatWords;
  checkPage?: boolean;
  prevUnitId?: number | null;
  setInfo?: SetInfo;
  setName?: string;
}

function SetPage({
  words,
  checkPage,
  prevUnitId,
  setInfo,
  setName
}: SetPageProps) {
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
    <>
      <section className={sectionStyles}>
        {currWord < shuffled.length && shuffled.at(currWord) && (
          <>
            <div className={reportCounterContainerStyles}>
              <ReportModal
                key={shuffled[currWord].id}
                wordId={shuffled[currWord].id}
                wordCheck={checkPage}
              />
              <WordCounter current={currWord + 1} total={shuffled.length} />
            </div>
            <div className={wordContainerStyles}>
              <WordImg
                wordEn={shuffled[currWord].en}
                gender={shuffled[currWord].gender_ro}
                imgName={shuffled[currWord].img_name}
              />
              {checkPage ? (
                <AudioBtn
                  key={shuffled[currWord].ro}
                  css={audioBtnStyles}
                  audioName={shuffled[currWord].audio_name}
                  word={shuffled[currWord].ro}
                  autoplay={false}
                />
              ) : (
                <>
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
                </>
              )}
              {showExample && (
                <>
                  {shuffled[currWord].ro_plural && (
                    <WordPlural plural={shuffled[currWord].ro_plural} />
                  )}
                  <Sentence wordId={shuffled[currWord].id} />
                </>
              )}
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
          <Finished
            prevUnitId={prevUnitId}
            setInfo={setInfo}
            setName={setName}
          />
        )}
      </section>
    </>
  );
}

export default SetPage;
