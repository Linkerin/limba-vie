'use client';

import { useMemo } from 'react';

import AudioBtn from '@/app/_components/_ui/AudioBtn/AudioBtn';
import CheckInput from '@/app/_components/SetScreen/CheckInput/CheckInput';
import Finished from '@/app/_components/SetScreen/Finished/Finished';
import ReportModal from '@/app/_components/ReportModal/ReportModal';
import type { SetInfo } from '@/app/_services/supabase/dbFetchers';
import { useCurrWord, useSetState } from '@/app/_hooks/useSetProvider';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import WordCounter from '@/app/_components/SetScreen/WordCounter/WordCounter';
import WordImg from '@/app/_components/Word/WordImg/WordImg';

import {
  hintContainerStyles,
  reportCounterContainerStyles,
  sectionStyles,
  wordContainerStyles
} from './PracticeSetView.styles';

export interface PracticeSetPageProps {
  setInfo?: SetInfo;
  setName?: string;
}

function PracticeSetView({ setInfo, setName }: PracticeSetPageProps) {
  const { currWordIndex, words } = useSetState();
  const word = useCurrWord();

  const isFinished = useMemo(
    () => currWordIndex >= words.length,
    [currWordIndex, words.length]
  );

  useMediaLoad(currWordIndex, words);

  return (
    <>
      <section className={sectionStyles}>
        {isFinished ? (
          <Finished setInfo={setInfo} setName={setName} checkPage={true} />
        ) : (
          <>
            <div className={reportCounterContainerStyles}>
              <ReportModal key={word.id} wordId={word.id} wordCheck={true} />
              <WordCounter current={currWordIndex + 1} total={words.length} />
            </div>

            <div className={wordContainerStyles}>
              <WordImg
                wordEn={word.en}
                gender={word.gender_ro}
                imgName={word.img_name}
              />
              <div className={hintContainerStyles} key={word.id}>
                <AudioBtn
                  key={word.id}
                  audioName={word.audio_name}
                  word={word.ro}
                  autoplay={false}
                />
                <p>{word.en}</p>
              </div>
            </div>

            <CheckInput key={word.id} />
          </>
        )}
      </section>
    </>
  );
}

export default PracticeSetView;
