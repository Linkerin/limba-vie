'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { IconRepeat } from '@tabler/icons-react';

import { SUPABASE_STORAGE_URL } from '@/app/_lib/constants';

import styles from './WordImg.module.css';

interface WordImgProps {
  wordEn: string;
  gender: string;
  imgName?: string;
  size?: '480' | '960';
}

function WordImg({
  wordEn,
  gender,
  imgName = wordEn,
  size = '480'
}: WordImgProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipHandler: React.MouseEventHandler = useCallback(e => {
    setIsFlipped(prevState => !prevState);
  }, []);

  return (
    <>
      <button
        aria-label={isFlipped ? 'Show image' : 'Show english translation'}
        className={styles.container}
        onClick={flipHandler}
      >
        <div
          className={classNames(styles.card, styles[gender], {
            [styles.flip]: isFlipped
          })}
        >
          <IconRepeat className={styles['flip-icon']} />
          <div className={styles.front}>
            <img
              alt={`${wordEn} picture`}
              src={`${SUPABASE_STORAGE_URL}/images/${size}/${imgName}.webp`}
              height={size}
              width={size}
              loading="eager"
            />
          </div>
          <div className={styles.back}>
            <p>{wordEn}</p>
          </div>
        </div>
      </button>
    </>
  );
}

export default WordImg;
