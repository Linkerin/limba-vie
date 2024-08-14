'use client';

import { useEffect, useState } from 'react';
import { css } from '@/styled-system/css';

import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';

const styles = css({
  color: 'success.darker'
});

interface LearnedWordWrapperProps {
  children: React.ReactNode;
  setId: Tables<'words'>['set_id'];
}

function LearnedWordWrapper({ children, setId }: LearnedWordWrapperProps) {
  const [completedSets, setCompletedSets] = useState<Array<number>>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sets = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.completedSets);
    if (sets) {
      setCompletedSets(JSON.parse(sets));
    }
  }, []);

  return completedSets?.includes(setId) ? (
    <span className={styles}>{children}</span>
  ) : (
    children
  );
}

export default LearnedWordWrapper;
