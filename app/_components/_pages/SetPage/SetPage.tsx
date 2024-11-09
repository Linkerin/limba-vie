'use client';

import { useCallback, useMemo, useState } from 'react';

import Actions from '@/app/_components/WordScreen/Actions/Actions';
import AudioBtn from '@/app/_components/_ui/AudioBtn/AudioBtn';
import Finished from '@/app/_components/WordScreen/Finished/Finished';
import ReportModal from '@/app/_components/ReportModal/ReportModal';
import Sentence from '@/app/_components/Word/Sentence/Sentence';
import { shuffleArr } from '@/app/_lib/utils/utils';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from '@/app/_components/Word/Word/Word';
import WordCounter from '@/app/_components/WordScreen/WordCounter/WordCounter';
import WordImg from '@/app/_components/Word/WordImg/WordImg';
import WordPlural from '@/app/_components/Word/WordPlural/WordPlural';
import type {
  RepeatWords,
  SetInfo,
  SetWords
} from '@/app/_services/dbFetchers';

import {
  reportCounterContainerStyles,
  sectionStyles,
  wordContainerStyles
} from './SetPage.styles';

export interface SetPageProps {
  words: SetWords | RepeatWords;
  setInfo?: SetInfo;
  setName?: string;
}

function SetPage({ words, setInfo, setName }: SetPageProps) {
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
              />
              <WordCounter current={currWord + 1} total={shuffled.length} />
            </div>
            <div className={wordContainerStyles}>
              <WordImg
                wordEn={shuffled[currWord].en}
                gender={shuffled[currWord].gender_ro}
                imgName={shuffled[currWord].img_name}
              />

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

              {showExample && (
                <>
                  {shuffled[currWord].ro_plural && (
                    <WordPlural plural={shuffled[currWord].ro_plural} />
                  )}
                  <Sentence wordId={shuffled[currWord].id} />
                </>
              )}
            </div>
            <Actions
              exampleClickHandler={exampleClickHandler}
              setCurrWord={nextWord}
              wordId={shuffled[currWord].id}
            />
          </>
        )}
        {currWord >= shuffled.length && (
          <Finished setInfo={setInfo} setName={setName} />
        )}
      </section>
    </>
  );
}

export default SetPage;
