'use client';

import ActionBtn from '../../ActionBtn/ActionBtn';
import type { Tables } from '@/app/_lib/supabase.types';
import useActionHandlers from './useActionHandlers';

import styles from './Actions.module.css';

export interface ActionsProps {
  wordId: Tables<'words'>['id'];
  setCurrWord: () => void;
  exampleClickHandler: () => void;
}

function Actions({ exampleClickHandler, setCurrWord, wordId }: ActionsProps) {
  const { learnedСlickHandler, repeatClickHandler } = useActionHandlers({
    setCurrWord,
    wordId
  });

  return (
    <div className={styles['action-btns']}>
      <ActionBtn variant="repeat" onClick={repeatClickHandler} />
      <ActionBtn variant="example" onClick={exampleClickHandler} />
      <ActionBtn variant="learned" onClick={learnedСlickHandler} />
    </div>
  );
}

export default Actions;
