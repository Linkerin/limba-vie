import { getArticle, getFullGender } from '@/app/_lib/utils/utils';
import type { Gender } from '@/app/_lib/types';
import { kalam } from '@/theme/fonts';
import type { Tables } from '@/app/_services/supabase/supabase.types';

import { styles, genderStyles } from './Word.styles';

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
