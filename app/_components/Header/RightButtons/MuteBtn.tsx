'use client';

import { useCallback, useMemo } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import Button from '../../_ui/Button/Button';
import useSoundMode from '@/app/_hooks/useSoundMode';

import styles from './RightButtons.module.css';

function MuteBtn() {
  const { isSoundAllowed, toggleSound } = useSoundMode();

  const popSound = useMemo(() => new Audio('/sounds/pop.aac'), []);

  const clickHandler: React.MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      if (!isSoundAllowed) {
        popSound.currentTime = 0;
        popSound.play();
      } else {
        popSound.pause();
      }

      toggleSound();
    },
    [toggleSound, isSoundAllowed, popSound]
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
    </>
  );
}

export default MuteBtn;
