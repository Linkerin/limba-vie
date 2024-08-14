'use client';

import { useCallback, useRef, useState } from 'react';
import { css } from '@/styled-system/css';
import { IconVolume } from '@tabler/icons-react';
import type { SystemStyleObject } from '@/styled-system/types';

import { buttonStyles, iconStyles } from './AudioBtn.styles';
import { getAudioUrl } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
import {
  useCurrentPlaying,
  useIsSoundAllowed
} from '@/app/_hooks/useSoundMode';

interface AudioBtnProps {
  audioName: Tables<'words'>['audio_name'];
  ariaLabel?: string;
  autoplay?: boolean;
  css?: SystemStyleObject;
  folders?: string;
  withMp3?: boolean;
  word?: Tables<'words'>['ro'];
}

function AudioBtn({
  audioName,
  ariaLabel,
  folders,
  word,
  autoplay = true,
  css: cssProp = {},
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
        className={css(buttonStyles, cssProp)}
        aria-label={ariaLabel ?? `Play '${word}' word sound`}
        onClick={audioClickHandler}
      >
        <IconVolume className={iconStyles} data-playing={isPlaying} />
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
