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

    audioRef.current.play();
  }, []);

  const onPlayingHandler: React.ReactEventHandler<HTMLAudioElement> =
    useCallback(e => {
      setIsPlaying(true);
    }, []);

  const onEndedHandler: React.ReactEventHandler<HTMLAudioElement> = useCallback(
    e => {
      setIsPlaying(false);
    },
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsPlaying(false);
    if (audioRef.current) {
      if (ssrLocalStorage.getItem('lvAudioAutoplay') === 'false') {
        audioRef.current.autoplay = false;
      } else {
        audioRef.current.autoplay = true;
      }
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
        src={`${SUPABASE_STORAGE_URL}/audio/ro/${audioName}.mp3`}
        onPlaying={onPlayingHandler}
        onEnded={onEndedHandler}
        preload="auto"
        autoPlay
      />
    </>
  );
}

export default AudioBtn;
