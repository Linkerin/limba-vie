'use client';

import { useCallback, useMemo, useState } from 'react';

import AudioBtn from '@/app/_components/_ui/AudioBtn/AudioBtn';
import CheckInput from '@/app/_components/WordScreen/CheckInput/CheckInput';
import Finished from '@/app/_components/WordScreen/Finished/Finished';
import ReportModal from '@/app/_components/ReportModal/ReportModal';
import { shuffleArr } from '@/app/_lib/utils/utils';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import WordCounter from '@/app/_components/WordScreen/WordCounter/WordCounter';
import WordImg from '@/app/_components/Word/WordImg/WordImg';
import type {
  RepeatWords,
  SetInfo,
  SetWords
} from '@/app/_services/dbFetchers';

import {
  hintContainerStyles,
  reportCounterContainerStyles,
  sectionStyles,
  wordContainerStyles
} from './PracticeSetPage.styles';

export interface PracticeSetPageProps {
  words: SetWords | RepeatWords;
  setInfo?: SetInfo;
  setName?: string;
}

function PracticeSetPage({ words, setInfo, setName }: PracticeSetPageProps) {
  const [currWordIndex, setCurrWordIndex] = useState(0);

  const shuffled = useMemo(() => shuffleArr(words), [words]);

  const nextWord = useCallback(() => {
    setCurrWordIndex(prevState => prevState + 1);
  }, []);

  const currWord = useMemo(
    () => shuffled[currWordIndex],
    [currWordIndex, shuffled]
  );

  useMediaLoad(currWordIndex, shuffled);

  return (
    <>
      <section className={sectionStyles}>
        {currWordIndex < shuffled.length && shuffled.at(currWordIndex) && (
          <>
            <div className={reportCounterContainerStyles}>
              <ReportModal
                key={currWord.id}
                wordId={currWord.id}
                wordCheck={true}
              />
              <WordCounter
                current={currWordIndex + 1}
                total={shuffled.length}
              />
            </div>

            <div className={wordContainerStyles}>
              <WordImg
                wordEn={currWord.en}
                gender={currWord.gender_ro}
                imgName={currWord.img_name}
              />
              <div className={hintContainerStyles} key={currWord.id}>
                <AudioBtn
                  key={currWord.ro}
                  audioName={currWord.audio_name}
                  word={currWord.ro}
                  autoplay={false}
                />
                <p>{currWord.en}</p>
              </div>
            </div>

            <CheckInput
              key={currWord.id}
              gender={currWord.gender_ro}
              plural={currWord.plural}
              setCurrWord={nextWord}
              wordId={currWord.id}
              wordRo={currWord.ro}
            />
          </>
        )}
        {currWordIndex >= shuffled.length && (
          <Finished setInfo={setInfo} setName={setName} checkPage={true} />
        )}
      </section>
    </>
  );
}

export default PracticeSetPage;
