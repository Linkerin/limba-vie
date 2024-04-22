/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { IconRepeat } from '@tabler/icons-react';

import { getWordsImageUrl } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './WordImg.module.css';

interface WordImgProps {
  flipHandler?: React.MouseEventHandler;
  gender: Tables<'words'>['gender_ro'];
  imgName?: Tables<'words'>['img_name'];
  isFlipped?: boolean;
  size?: '480' | '960';
  wordEn: Tables<'words'>['en'];
}

function WordImg({
  wordEn,
  gender,
  flipHandler,
  imgName = wordEn,
  isFlipped = false,
  size = '480'
}: WordImgProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoadHandler = useCallback(() => {
    setIsLoaded(true);
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
            className={classNames(styles.front, { [styles.loaded]: isLoaded })}
          >
            <img
              alt={`${wordEn} picture`}
              src={getWordsImageUrl(imgName)}
              // sizes={`(max-width: 479px) 256px,
              //         (max-width: 959px) 480px,
              //         (max-width: 1023px) 960px,
              //         1024px`}
              // srcSet={`${CLOUDINARY_IMG_URL}/f_auto,q_75,w_256/v1/limba/${imgName} 256w,
              //          ${CLOUDINARY_IMG_URL}/f_auto,q_75,w_480/v1/limba/${imgName} 480w,
              //          ${CLOUDINARY_IMG_URL}/f_auto,q_75,w_960/v1/limba/${imgName} 960w,
              //          ${CLOUDINARY_IMG_URL}/f_auto,q_75,w_1024/v1/limba/${imgName} 1024w`}
              fetchPriority="high"
              loading="eager"
              onLoad={onLoadHandler}
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
