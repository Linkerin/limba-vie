'use client';

import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconVolume } from '@tabler/icons-react';

import { getAudioUrl } from '@/app/_lib/utils';
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
  withMp3?: boolean;
  word?: Tables<'words'>['ro'];
}

function AudioBtn({
  audioName,
  ariaLabel,
  className,
  folders,
  word,
  autoplay = true,
  withMp3 = true
}: AudioBtnProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { currentPlaying, setCurrentPlaying } = useCurrentPlaying();
  const isSoundAllowed = useIsSoundAllowed();

  const audioClickHandler: React.MouseEventHandler = useCallback(async e => {
    e.preventDefault();
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
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
        key={audioName}
        ref={audioRef}
        id={`audio-${audioName}`}
        autoPlay={autoplay && isSoundAllowed}
        onAbort={onAbortEndedHandler}
        onEnded={onAbortEndedHandler}
        onPlaying={onPlayingHandler}
        preload="auto"
      >
        <source src={getAudioUrl({ audioName, folders })} type="audio/mp4" />
        {withMp3 && (
          <source
            src={getAudioUrl({ audioName, folders, format: 'mp3' })}
            type="audio/mpeg"
          />
        )}
      </audio>
    </>
  ) : null;
}

export default AudioBtn;
