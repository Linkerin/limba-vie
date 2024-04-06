'use client';

import classNames from 'classnames';
import Link from 'next/link';

import { capitalizeWord } from '@/app/_lib/utils';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

import styles from './SetItem.module.css';

function isSetCompleted(id: number) {
  const completedSets = ssrLocalStorage.getItem('lvCompletedSets');
  if (!completedSets) return false;

  const completedSetsArr = JSON.parse(completedSets);
  if (completedSetsArr.includes(id)) return true;

  return false;
}

interface SetItemProps {
  set: {
    id: number;
    set: string;
    emoji: string;
    words: { count: number }[];
  };
}

function SetItem({ set }: SetItemProps) {
  const capitalizedSet = capitalizeWord(set.set);
  // const isCompleted = isSetCompleted(set.id);
  const wordsNum = set.words[0].count;

  return (
    <li className={classNames(styles.section)}>
      <span>{set.emoji}</span>
      <Link
        aria-label={`To ${capitalizedSet} words set`}
        href={`/set/${set.set}`}
        target="_self"
      >
        {capitalizedSet}
      </Link>
      <span className={styles['words-number']}>
        {wordsNum} word{wordsNum !== 1 ? 's' : null}
      </span>
    </li>
  );
}

export default SetItem;
