import { Kalam } from 'next/font/google';

import { getArticle, getFullGender } from '@/app/_lib/utils';
import { Gender } from '@/app/_lib/types';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './Word.module.css';

const kalam = Kalam({
  subsets: ['latin-ext'],
  weight: ['400']
});

interface WordProps {
  gender: Gender;
  plural: Tables<'words'>['plural'];
  word: Tables<'words'>['ro'];
  children?: React.ReactNode;
}

function Word({ children, gender, plural, word }: WordProps) {
  return (
    <>
      <div className={styles.container}>
        <p className={kalam.className}>
          {!plural && gender && gender.length > 0
            ? getArticle(gender) + ' '
            : null}
          {word}
        </p>
        {children}
      </div>
      {gender && gender?.length > 0 && (
        <p className={styles[gender]}>{getFullGender(gender)}</p>
      )}
    </>
  );
}

export default Word;
