/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';

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
  return (
    <div className={classNames(styles.container, styles[gender])}>
      <img
        alt={`${wordEn} picture`}
        src={`${SUPABASE_STORAGE_URL}/images/${size}/${imgName}.webp`}
        height={size}
        width={size}
        loading="eager"
      />
    </div>
  );
}

export default WordImg;
