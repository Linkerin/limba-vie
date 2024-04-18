'use client';

import { useCallback, useMemo, useState } from 'react';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';

import styles from './MuteBtn.module.css';

const autoplayKey = 'lvAudioAutoplay';

function MuteBtn() {
  const [autoplay, setAutoplay] = useState(
    !(ssrLocalStorage.getItem(autoplayKey) === 'false')
  );

  const doneSound = useMemo(() => {
    if (typeof Audio === 'undefined') return;

    const audio = new Audio(
      `${SUPABASE_STORAGE_URL}/audio_ro/lv_button_sound.mp3`
    );
    return audio;
  }, []);

  const clickHandler: React.MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      try {
        setAutoplay(prevState => {
          const autoplayPrefSet = ssrLocalStorage.setItem(
            autoplayKey,
            JSON.stringify(!prevState)
          );

          if (!autoplayPrefSet) return prevState;

          if (doneSound) {
            if (prevState === false) {
              doneSound.play();
            } else {
              doneSound.pause();
              doneSound.currentTime = 0;
            }
          }

          return !prevState;
        });
      } catch (err) {
        console.log(err);
      }
    },
    [doneSound]
  );

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
