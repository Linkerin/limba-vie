import { Kalam } from 'next/font/google';
import { css } from '@/styled-system/css';

import { getArticle, getFullGender } from '@/app/_lib/utils/utils';
import type { Gender } from '@/app/_lib/types';
import type { Tables } from '@/app/_lib/supabase.types';

const kalam = Kalam({
  subsets: ['latin-ext'],
  weight: ['400']
});

const styles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'token(spacing.2, 0.5rem)',
  fontSize: 'min(2.75rem, 5.5vmax)',
  textAlign: 'center',

  '& > p:first-of-type': {
    lineHeight: '1.125em'
  }
});

const genderStyles = css({
  fontSize: '1.75rem',
  lineHeight: '1em',
  marginBlockEnd: 'token(spacing.2, 0.5rem)',

  '&[data-gender="m"]': {
    color: 'g.masculine'
  },

  '&[data-gender="n"]': {
    color: 'g.neutral'
  },

  '&[data-gender="f"]': {
    color: 'g.feminine'
  }
});

interface WordProps {
  gender: Gender;
  plural: Tables<'words'>['plural'];
  word: Tables<'words'>['ro'];
  children?: React.ReactNode;
}

function Word({ children, gender, plural, word }: WordProps) {
  const article = getArticle(gender, plural);

  return (
    <>
      <div className={styles}>
        <p className={kalam.className} lang="ro-RO">
          {article ? article + ' ' : null}
          {word}
        </p>
        {children}
      </div>
      {gender && gender?.length > 0 && (
        <p className={genderStyles} lang="ro-RO" data-gender={gender}>
          {getFullGender(gender)}
        </p>
      )}
    </>
  );
}

export default Word;
