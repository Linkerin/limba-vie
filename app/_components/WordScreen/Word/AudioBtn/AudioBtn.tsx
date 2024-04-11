'use client';

import { useCallback, useRef } from 'react';
import { IconVolume } from '@tabler/icons-react';

import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';

import styles from './AudioBtn.module.css';

interface AudioBtnProps {
  audioName: string;
  word: string;
}

function AudioBtn({ audioName, word }: AudioBtnProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioClickHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!audioRef.current) return;

    audioRef.current.play();
  }, []);

  return (
    <>
      <button
        className={styles.btn}
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
  );
}

export default AudioBtn;
