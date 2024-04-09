/* eslint-disable @next/next/no-img-element */

import classNames from 'classnames';
import { IconRepeat } from '@tabler/icons-react';

import { CLOUDINARY_IMG_URL } from '@/app/_lib/constants';

import styles from './WordImg.module.css';

interface WordImgProps {
  wordEn: string;
  flipHandler?: React.MouseEventHandler;
  gender: string;
  imgName?: string;
  isFlipped?: boolean;
  size?: '480' | '960';
}

function WordImg({
  wordEn,
  gender,
  flipHandler,
  imgName = wordEn,
  isFlipped = false,
  size = '480'
}: WordImgProps) {
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
            { [styles[gender]]: !!gender },
            {
              [styles.flip]: isFlipped
            }
          )}
        >
          <IconRepeat className={styles['flip-icon']} />
          <div className={styles.front}>
            <img
              alt={`${wordEn} picture`}
              src={`${CLOUDINARY_IMG_URL}/f_auto,q_75,w_480/v1/limba/${imgName}`}
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
