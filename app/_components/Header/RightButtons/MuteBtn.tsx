'use client';

import { useCallback } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import Button from '../../_ui/Button/Button';
import useSoundMode from '@/app/_hooks/useSoundMode';

import styles from './RightButtons.styles';

function MuteBtn() {
  const { isSoundAllowed, toggleSound } = useSoundMode();

  const clickHandler: React.MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      toggleSound();
    },
    [toggleSound]
  );

  const label = `Turn ${isSoundAllowed ? 'off' : 'on'} word sounds autoplay`;

  return (
    <Button
      aria-label={label}
      css={styles}
      onClick={clickHandler}
      title={label}
      fadeAnimation
      vibrate={isSoundAllowed ? false : true}
      variant="base"
    >
      <span aria-hidden="true">
        {isSoundAllowed ? <IconVolume /> : <IconVolumeOff />}
      </span>
    </Button>
  );
}

export default MuteBtn;
