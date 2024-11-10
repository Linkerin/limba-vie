'use client';

import { css } from '@/styled-system/css';

import type { Tables } from '@/app/_services/supabase/supabase.types';
import useIsWordLearned from './useIsWordLearned';

const styles = css({
  color: 'success.darker'
});

interface LearnedWordWrapperProps {
  children: React.ReactNode;
  setId?: Tables<'words'>['set_id'];
  wordId?: Tables<'words'>['id'];
}

function LearnedWordWrapper({
  children,
  setId,
  wordId
}: LearnedWordWrapperProps) {
  const isLearned = useIsWordLearned({ setId, wordId });

  return (
    <span
      className={isLearned ? styles : undefined}
      aria-label="Romanian word"
      lang="ro-RO"
    >
      {children}
    </span>
  );
}

export default LearnedWordWrapper;
