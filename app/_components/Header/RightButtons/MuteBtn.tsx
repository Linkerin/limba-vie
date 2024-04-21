'use client';

import { useCallback, useState } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import Button from '../../Button/Button';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

import styles from './RightButtons.module.css';

const autoplayKey = 'lvAudioAutoplay';

function MuteBtn() {
  const [autoplay, setAutoplay] = useState(
    !(ssrLocalStorage.getItem(autoplayKey) === 'false')
  );

  const clickHandler: React.MouseEventHandler = useCallback(e => {
    e.preventDefault();
    try {
      setAutoplay(prevState => {
        const autoplayPrefSet = ssrLocalStorage.setItem(
          autoplayKey,
          JSON.stringify(!prevState)
        );

        if (!autoplayPrefSet) return prevState;

        return !prevState;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Button
      aria-label={`Turn ${autoplay ? 'off' : 'on'} word sounds autoplay`}
      className={styles.btn}
      onClick={clickHandler}
      title={`Turn ${autoplay ? 'off' : 'on'} word sounds autoplay`}
      fadeAnimation
    >
      {autoplay ? <IconVolume /> : <IconVolumeOff />}
    </Button>
  );
}

export default MuteBtn;
