/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconRepeat } from '@tabler/icons-react';

import { getWordsImageUrl } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './WordImg.module.css';

interface WordImgProps {
  gender: Tables<'words'>['gender_ro'];
  wordEn: Tables<'words'>['en'];
  imgName?: Tables<'words'>['img_name'];
}

function WordImg({ gender, wordEn, imgName = wordEn }: WordImgProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImage, setCurrentImage] = useState(imgName);

  if (imgName !== currentImage) {
    setIsFlipped(false);
    setCurrentImage(imgName);
  }

  const onLoadHandler = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const flipHandler: React.MouseEventHandler = useCallback(_ => {
    setIsFlipped(prevState => !prevState);
  }, []);

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <button
        aria-label={isFlipped ? 'Show image' : 'Show english translation'}
        className={styles.container}
        onClick={flipHandler}
      >
        <div
          className={classNames(
            styles.card,
            { [styles[`${gender}`]]: !!gender },
            { [styles.flip]: isFlipped }
          )}
        >
          <IconRepeat className={styles['flip-icon']} />
          <div
            className={classNames(styles.front, {
              [styles.loading]: !isLoaded
            })}
          >
            <img
              ref={imgRef}
              alt={`${wordEn} picture`}
              src={getWordsImageUrl(imgName)}
              fetchPriority="high"
              loading="eager"
              onLoad={onLoadHandler}
            />
            <div
              className={classNames(styles.loader, {
                [styles.loaded]: isLoaded
              })}
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
