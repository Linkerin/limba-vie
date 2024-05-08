'use client';

import { useCallback, useRef, useState, useId } from 'react';
import classNames from 'classnames';
import { IconVolume } from '@tabler/icons-react';

import { getWordsAudioUrl } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import {
  useCurrentPlaying,
  useIsSoundAllowed
} from '@/app/_hooks/useSoundMode';

import styles from './AudioBtn.module.css';

interface AudioBtnProps {
  audioName: Tables<'words'>['audio_name'];
  ariaLabel?: string;
  autoplay?: boolean;
  className?: React.HTMLProps<'button'>['className'];
  folders?: string;
  word?: Tables<'words'>['ro'];
}

function AudioBtn({
  audioName,
  ariaLabel,
  className,
  folders,
  word,
  autoplay = true
}: AudioBtnProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioId = useId();
  const audioRef = useRef<HTMLAudioElement>(null);

  const { currentPlaying, setCurrentPlaying } = useCurrentPlaying();
  const isSoundAllowed = useIsSoundAllowed();

  const audioClickHandler: React.MouseEventHandler = useCallback(e => {
    e.preventDefault();
    if (!audioRef.current) return;

    try {
      audioRef.current.play();
    } catch (err) {
      console.error(
        `The audio ${audioRef?.current?.id} play request was interrupted`,
        err
      );
    }
  }, []);

  const onPlayingHandler: React.ReactEventHandler<HTMLAudioElement> =
    useCallback(
      e => {
        if (currentPlaying && currentPlaying?.id !== e.currentTarget.id) {
          currentPlaying.dispatchEvent(new Event('ended'));
          currentPlaying.pause();
          currentPlaying.currentTime = 0;
        }

        setIsPlaying(true);
        setCurrentPlaying(e.currentTarget);
      },
      [currentPlaying, setCurrentPlaying]
    );

  const onAbortEndedHandler: React.ReactEventHandler<HTMLAudioElement> =
    useCallback(_ => {
      setIsPlaying(false);
    }, []);

  return !!audioName?.length ? (
    <>
      <button
        className={classNames(styles.btn, className)}
        aria-label={ariaLabel ?? `Play '${word}' word sound`}
        onClick={audioClickHandler}
      >
        <IconVolume className={classNames({ [styles.playing]: isPlaying })} />
      </button>
      <audio
        ref={audioRef}
        id={audioId}
        src={getWordsAudioUrl(audioName, folders)}
        autoPlay={autoplay && isSoundAllowed}
        onAbort={onAbortEndedHandler}
        onEnded={onAbortEndedHandler}
        onPlaying={onPlayingHandler}
        preload="auto"
      />
    </>
  ) : null;
}

export default AudioBtn;
