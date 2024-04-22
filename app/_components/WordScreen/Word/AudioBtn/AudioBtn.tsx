'use client';

import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconVolume } from '@tabler/icons-react';

import { AUDIO_FILE_FORMAT, SUPABASE_STORAGE_URL } from '@/app/_lib/constants';
import type { Tables } from '@/app/_lib/supabase.types';
import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

import styles from './AudioBtn.module.css';

interface AudioBtnProps {
  audioName: Tables<'words'>['audio_name'];
  word: Tables<'words'>['ro'];
}

function AudioBtn({ audioName, word }: AudioBtnProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const isSoundAllowed = useIsSoundAllowed();

  const audioClickHandler: React.MouseEventHandler = useCallback(e => {
    e.preventDefault();
    if (!audioRef.current) return;

    audioRef.current.play();
  }, []);

  const onPlayingHandler: React.ReactEventHandler<HTMLAudioElement> =
    useCallback(_ => {
      setIsPlaying(true);
    }, []);

  const onAbortEndedHandler: React.ReactEventHandler<HTMLAudioElement> =
    useCallback(_ => {
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
        src={`${SUPABASE_STORAGE_URL}/audio/ro/${audioName}.${AUDIO_FILE_FORMAT}`}
        autoPlay={isSoundAllowed}
        onAbort={onAbortEndedHandler}
        onEnded={onAbortEndedHandler}
        onPlaying={onPlayingHandler}
        preload="auto"
      />
    </>
  );
}

export default AudioBtn;
