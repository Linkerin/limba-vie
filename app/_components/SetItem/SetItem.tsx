'use client';

import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { IconCheck } from '@tabler/icons-react';

import { capitalizeWord } from '@/app/_lib/utils';
import ListItem from '../_ui/ListItem/ListItem';
import SetItemPopover from './SetItemPopover/SetItemPopover';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './SetItem.module.css';
import ListItemLink from '../_ui/ListItemLink/ListItemLink';

import Portal from '../_ui/Portal/Portal';

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
  children?: React.ReactNode;
  emoji: Tables<'sorted_sets'>['emoji'];
  set: Tables<'sorted_sets'>['set'];
  setId: Tables<'sorted_sets'>['id'];
}

function SetItem({ children, emoji, set, setId }: SetItemProps) {
  const [showModal, setShowModal] = useState(false);

  const isCompleted = useMemo(() => isSetCompleted(setId), [setId]);

  const toggleModalState = useCallback(() => {
    setShowModal(prevState => !prevState);
  }, []);

  return set ? (
    <>
      <ListItem
        id={`set-${setId}`}
        className={classNames({
          [styles.completed]: isCompleted
        })}
      >
        {isCompleted ? (
          <>
            <button
              className={classNames(styles.content, styles['completed-btn'])}
              onClick={toggleModalState}
            >
              {children}
            </button>
            <span className={styles['completed-icon']}>
              <IconCheck />
            </span>
          </>
        ) : (
          <ListItemLink
            aria-label={`To ${capitalizeWord(set)} words set`}
            href={`/set/${encodeURIComponent(set)}`}
            target="_self"
            className={styles.content}
          >
            {children}
          </ListItemLink>
        )}
        {showModal && (
          <Portal>
            <SetItemPopover
              closeHandler={toggleModalState}
              emoji={emoji}
              set={set}
            />
          </Portal>
        )}
      </ListItem>
    </>
  ) : null;
}

export default SetItem;
