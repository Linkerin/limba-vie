'use client';

import { useState, useEffect } from 'react';

import Actions from './Actions/Actions';
import Finished from './Finished/Finished';
import Word from './Word/Word';
import WordImg from './WordImg/WordImg';
import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';

import styles from './WordScreen.module.css';

function WordScreen({ words }: { words: any[] }) {
  const [currWord, setCurrWord] = useState(0);

  const nextWord = () => {
    setCurrWord(prevState => prevState + 1);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    console.log('started');
    for (const word of words) {
      const img = new Image();
      const audio = new Audio();
      img.src = `${SUPABASE_STORAGE_URL}/images/${'480'}/${word.img_name}.webp`;
      audio.src = `${SUPABASE_STORAGE_URL}/audio_ro/${word.audio_name}.mp3`;
    }
  }, [words]);

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

export default WordScreen;
