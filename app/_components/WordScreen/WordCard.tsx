'use client';

import { useState } from 'react';

import Actions from './Actions/Actions';
import Finished from './Finished/Finished';
import Word from './Word/Word';
import WordImg from './WordImg/WordImg';

import styles from './WordCard.module.css';

function WordCard({ words }: { words: any[] }) {
  const [currWord, setCurrWord] = useState(0);

  const nextWord = () => {
    setCurrWord(prevState => prevState + 1);
  };

  return currWord < words.length ? (
    <section className={styles.section}>
      <p className={styles.counter}>
        {currWord + 1} / {words.length}
      </p>
      <WordImg
        wordEn={words[currWord].en}
        gender={words[currWord].gender_ro}
        imgName={words[currWord].img_name}
      />
      <Word
        word={words[currWord].ro}
        gender={words[currWord].gender_ro}
        audioName={words[currWord].audio_name}
      />
      <Actions setCurrWord={nextWord} />
    </section>
  ) : (
    <Finished setName={words[0]['set_id'].set} />
  );
}

export default WordCard;
