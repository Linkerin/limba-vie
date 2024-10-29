'use client';

import { useMemo } from 'react';
import { css } from '@/styled-system/css';

import type { Tables } from '@/app/_lib/supabase.types';
import useCompletedSets from '@/app/_hooks/useCompletedSets';

const styles = css({
  color: 'success.darker'
});

interface LearnedWordWrapperProps {
  children: React.ReactNode;
  setId: Tables<'words'>['set_id'];
}

function LearnedWordWrapper({ children, setId }: LearnedWordWrapperProps) {
  const completedSetIds = useCompletedSets()?.map(set => set.setId);
  const isLearned = useMemo(
    () => completedSetIds?.includes(setId),
    [completedSetIds, setId]
  );

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
