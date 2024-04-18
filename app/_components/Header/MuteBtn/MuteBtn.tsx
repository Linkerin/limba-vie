'use client';

import { useCallback, useMemo, useState } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

import styles from './MuteBtn.module.css';

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
    <button
      className={styles.btn}
      aria-label={`Turn ${autoplay ? 'off' : 'on'} word sounds autoplay`}
      onClick={clickHandler}
      title={`Turn ${autoplay ? 'off' : 'on'} word sounds autoplay`}
    >
      {autoplay ? <IconVolume /> : <IconVolumeOff />}
    </button>
  );
}

export default MuteBtn;
