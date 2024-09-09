'use client';

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

  return completedSetIds?.includes(setId) ? (
    <span className={styles}>{children}</span>
  ) : (
    children
  );
}

export default LearnedWordWrapper;
