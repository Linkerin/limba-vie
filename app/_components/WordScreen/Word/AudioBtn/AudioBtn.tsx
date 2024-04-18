'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconVolume } from '@tabler/icons-react';

import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './AudioBtn.module.css';

interface AudioBtnProps {
  audioName: Tables<'words'>['audio_name'];
  word: Tables<'words'>['ro'];
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsPlaying(false);
    const noAutoplay = ssrLocalStorage.getItem('lvAudioAutoplay') === 'false';
    if (noAutoplay) return;

    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [word]);

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
        src={`${SUPABASE_STORAGE_URL}/audio_ro/ro/${audioName}.mp3`}
        onEnded={onEndedHandler}
      />
    </>
  );
}

export default AudioBtn;
