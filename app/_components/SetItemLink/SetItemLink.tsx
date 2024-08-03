'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { IconCheck } from '@tabler/icons-react';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import { Tables } from '@/app/_lib/supabase.types';

import styles from './SetItemLink.module.css';

function isSetCompleted(id: number | null) {
  if (typeof window === 'undefined') return;
  if (id === null) return false;

  const completedSets = ssrLocalStorage.getItem('lvCompletedSets');
  if (!completedSets) return false;

  const completedSetsArr = JSON.parse(completedSets);
  if (completedSetsArr.includes(id)) return true;

  return false;
}

interface SetItemLinkProps {
  id: Tables<'sets_view'>['id'];
  emoji: Tables<'sets_view'>['emoji'];
  set: Tables<'sets_view'>['set'];
  wordsNum: Tables<'sets_view'>['words_count'];
}

function SetItemLink({ id, emoji, set, wordsNum }: SetItemLinkProps) {
  const isCompleted = useMemo(() => isSetCompleted(id), [id]);

  return (
    <li className={classNames(styles.set, { [styles.completed]: isCompleted })}>
      <Link
        aria-label={`To '${set}' words set`}
        href={set ? `/set/${encodeURIComponent(set)}` : '#'}
      >
        <span>{emoji}</span>
        {wordsNum} word{wordsNum === 1 ? '' : 's'}
      </Link>
      {isCompleted && (
        <span className={styles['completed-icon']}>
          <IconCheck />
        </span>
      )}
    </li>
  );
}

export default SetItemLink;
