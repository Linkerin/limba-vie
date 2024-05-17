'use client';

import { useCallback } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import Button from '../../_ui/Button/Button';
import useSoundMode from '@/app/_hooks/useSoundMode';

import styles from './RightButtons.module.css';

function MuteBtn() {
  const { isSoundAllowed, toggleSound } = useSoundMode();

  const clickHandler: React.MouseEventHandler = useCallback(
    async e => {
      e.preventDefault();
      const popSound = new Audio('/sounds/pop.aac');
      toggleSound();
      !isSoundAllowed && (await popSound.play());
    },
    [toggleSound, isSoundAllowed]
  );

  return (
    <Button
      aria-label={`Turn ${isSoundAllowed ? 'off' : 'on'} word sounds autoplay`}
      className={styles.btn}
      onClick={clickHandler}
      title={`Turn ${isSoundAllowed ? 'off' : 'on'} word sounds autoplay`}
      fadeAnimation
      vibrate={isSoundAllowed ? false : true}
    >
      {isSoundAllowed ? <IconVolume /> : <IconVolumeOff />}
    </Button>
  );
}

export default MuteBtn;
