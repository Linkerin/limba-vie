'use client';
import { useCallback, useRef } from 'react';
import { Kalam } from 'next/font/google';
import { IconVolume } from '@tabler/icons-react';

import { getArticle, getFullGender } from '@/app/_lib/utils';
import { Gender } from '@/app/_lib/types';
import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';

import styles from './Word.module.css';

const kalam = Kalam({
  subsets: ['latin-ext'],
  weight: ['400']
});

interface WordProps {
  word: string;
  audioName?: string;
  gender?: Gender;
}

function Word({ word, audioName, gender }: WordProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioClickHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!audioRef.current) return;

    audioRef.current.play();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <p className={kalam.className}>
          {gender && gender.length > 0 ? getArticle(gender) : null} {word}
        </p>
        {audioName && audioName?.length > 0 && (
          <>
            <button
              aria-label={`Play '${word}' word sound`}
              onClick={audioClickHandler}
            >
              <IconVolume />
            </button>
            <audio
              ref={audioRef}
              src={`${SUPABASE_STORAGE_URL}/audio_ro/${audioName}.mp3`}
            />
          </>
        )}
      </div>
      {gender && gender?.length > 0 && (
        <p className={styles[gender]}>{getFullGender(gender)}</p>
      )}
    </>
  );
}

export default Word;
