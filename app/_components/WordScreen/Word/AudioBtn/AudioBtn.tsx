'use client';

import { useCallback, useRef, useState } from 'react';
import { IconVolume } from '@tabler/icons-react';

import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';

import styles from './AudioBtn.module.css';
import classNames from 'classnames';

interface AudioBtnProps {
  audioName: string;
  word: string;
}

function AudioBtn({ audioName, word }: AudioBtnProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const audioClickHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!audioRef.current) return;

    setIsPlaying(true);
    audioRef.current.play();
  }, []);

  const onEndedHandler = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <>
      <button
        className={styles.btn}
        aria-label={`Play '${word}' word sound`}
        onClick={audioClickHandler}
      >
        <IconVolume className={classNames({ [styles.playing]: isPlaying })} />
      </button>
      <audio
        ref={audioRef}
        src={`${SUPABASE_STORAGE_URL}/audio_ro/${audioName}.mp3`}
        onAbort={onEndedHandler}
        onEnded={onEndedHandler}
      />
    </>
  );
}

export default AudioBtn;
