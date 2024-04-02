import Image from 'next/image';
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
      <Image
        alt={`${wordEn} picture`}
        src={`${SUPABASE_STORAGE_URL}/images/${size}/${imgName}.webp`}
        height={size}
        width={size}
        priority
      />
    </div>
  );
}

export default WordImg;
