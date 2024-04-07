'use client';

import { useCallback, useState } from 'react';

import Actions from './Actions/Actions';
import Finished from './Finished/Finished';
import useMediaLoad from '@/app/_hooks/useMediaLoad';
import Word from './Word/Word';
import WordImg from './WordImg/WordImg';

import styles from './WordScreen.module.css';

function WordScreen({ words }: { words: any[] }) {
  const [currWord, setCurrWord] = useState(0);
  const [isImgFlipped, setIsImgFlipped] = useState(false);

  const flipHandler: React.MouseEventHandler = useCallback(e => {
    setIsImgFlipped(prevState => !prevState);
  }, []);

  const nextWord = useCallback(() => {
    setIsImgFlipped(false);
    setCurrWord(prevState => prevState + 1);
  }, []);

  useMediaLoad(currWord, words);

  return (
    <section className={styles.section}>
      {currWord < words.length ? (
        <>
          <p className={styles.counter}>
            {currWord + 1} / {words.length}
          </p>
          <WordImg
            wordEn={words[currWord].en}
            flipHandler={flipHandler}
            gender={words[currWord].gender_ro}
            imgName={words[currWord].img_name}
            isFlipped={isImgFlipped}
          />
          <Word
            word={words[currWord].ro}
            gender={words[currWord].gender_ro}
            audioName={words[currWord].audio_name}
          />
          <Actions setCurrWord={nextWord} wordId={words[currWord].id} />
        </>
      ) : (
        <Finished set={words[0]['set_id']} />
      )}
    </section>
  );
}

export default WordScreen;
