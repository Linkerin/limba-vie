'use client';

import { useCallback } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import Btn from '../../_ui/Button/Btn';
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

  return (
    <Btn
      aria-label={`Turn ${isSoundAllowed ? 'off' : 'on'} word sounds autoplay`}
      css={styles}
      onClick={clickHandler}
      title={`Turn ${isSoundAllowed ? 'off' : 'on'} word sounds autoplay`}
      fadeAnimation
      vibrate={isSoundAllowed ? false : true}
      variant="base"
    >
      {isSoundAllowed ? <IconVolume /> : <IconVolumeOff />}
    </Btn>
  );
}

export default MuteBtn;
