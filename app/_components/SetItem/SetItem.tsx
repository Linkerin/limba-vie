'use client';

import classNames from 'classnames';

import ListItem from '../ListItem/ListItem';
import SetCompetedIcon from './SetCompletedIcon/SetCompletedIcon';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './SetItem.module.css';

function isSetCompleted(id: number | null) {
  if (typeof window === 'undefined') return;
  if (id === null) return false;

  const completedSets = ssrLocalStorage.getItem('lvCompletedSets');
  if (!completedSets) return false;

  const completedSetsArr = JSON.parse(completedSets);
  if (completedSetsArr.includes(id)) return true;

  return false;
}

interface SetItemProps {
  setId: Tables<'sorted_sets'>['id'];
  children?: React.ReactNode;
}

function SetItem({ children, setId }: SetItemProps) {
  const isCompleted = isSetCompleted(setId);

  return (
    <ListItem
      id={`set-${setId}`}
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
