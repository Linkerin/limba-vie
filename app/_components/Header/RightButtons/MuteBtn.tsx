'use client';

import { useCallback, useRef } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import Button from '../../_ui/Button/Button';
import useSoundMode from '@/app/_hooks/useSoundMode';

import styles from './RightButtons.module.css';

function MuteBtn() {
  const { isSoundAllowed, toggleSound } = useSoundMode();

  const audioRef = useRef<HTMLAudioElement>(null);

  const clickHandler: React.MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      toggleSound();

      if (!audioRef.current) return;

      if (!isSoundAllowed) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    },
    [toggleSound, isSoundAllowed]
  );

  return (
    <>
      <Button
        aria-label={`Turn ${
          isSoundAllowed ? 'off' : 'on'
        } word sounds autoplay`}
        className={styles.btn}
        onClick={clickHandler}
        title={`Turn ${isSoundAllowed ? 'off' : 'on'} word sounds autoplay`}
        fadeAnimation
        vibrate={isSoundAllowed ? false : true}
      >
        {isSoundAllowed ? <IconVolume /> : <IconVolumeOff />}
      </Button>
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/pop.aac" type="audio/mp4" />
        <source src="/sounds/pop.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}

export default MuteBtn;
