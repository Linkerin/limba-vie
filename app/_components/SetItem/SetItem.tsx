'use client';

import classNames from 'classnames';

import ListItem from '../ListItem/ListItem';
import SetCompetedIcon from './SetCompletedIcon/SetCompletedIcon';
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
  children?: React.ReactNode;
}

function SetItem({ children, set }: SetItemProps) {
  const isCompleted = isSetCompleted(set.id);

  return (
    <ListItem
      id={`set-${set.id}`}
      className={classNames({
        [styles.completed]: isCompleted
      })}
    >
      {children}
      {isCompleted && <SetCompetedIcon />}
    </ListItem>
  );
}

export default SetItem;
