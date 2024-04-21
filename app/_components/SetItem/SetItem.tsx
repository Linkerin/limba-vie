'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { IconCheck } from '@tabler/icons-react';

import { capitalizeWord } from '@/app/_lib/utils';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';
import type { WordsCount } from '../SetsList/SetsList';

import styles from './SetItem.module.css';

function isSetCompleted(id: number) {
  if (typeof window === 'undefined') return;

  const completedSets = ssrLocalStorage.getItem('lvCompletedSets');
  if (!completedSets) return false;

  const completedSetsArr = JSON.parse(completedSets);
  if (completedSetsArr.includes(id)) return true;

  return false;
}

interface SetItemProps {
  set: Pick<Tables<'sets'>, 'id' | 'emoji' | 'set'> & WordsCount;
}

function SetItem({ set }: SetItemProps) {
  const capitalizedSet = capitalizeWord(set.set);
  const isCompleted = isSetCompleted(set.id);
  const wordsNum = set.words[0].count;

  return (
    <li
      className={classNames(styles.section, {
        [styles.completed]: isCompleted
      })}
    >
      <span className={styles.emoji}>{set.emoji}</span>
      <Link
        aria-label={`To ${capitalizedSet} words set`}
        href={`/set/${encodeURIComponent(set.set)}`}
        target="_self"
      >
        {capitalizedSet}
      </Link>
      <span className={styles['words-number']}>
        {wordsNum} word{wordsNum !== 1 ? 's' : null}
      </span>
      {isCompleted && (
        <span className={styles.done}>
          <IconCheck />
        </span>
      )}
    </li>
  );
}

export default SetItem;
