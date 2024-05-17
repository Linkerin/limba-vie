'use client';

import { useCallback } from 'react';
import classNames from 'classnames';

import ActionBtn from '../../_ui/ActionBtn/ActionBtn';
import type { Tables } from '@/app/_lib/supabase.types';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useWordHandlers from '../../../_hooks/useWordHandlers';

import styles from './Actions.module.css';

export interface ActionsProps {
  wordId: Tables<'words'>['id'];
  setCurrWord: () => void;
  exampleClickHandler: () => void;
}

function Actions({ exampleClickHandler, setCurrWord, wordId }: ActionsProps) {
  const isApplePwa = useIsApplePwa();
  const { learnedHandler, repeatHandler } = useWordHandlers({
    wordId
  });

  const learnedClickHandler: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      e => {
        setCurrWord();
        learnedHandler();
      },
      [learnedHandler, setCurrWord]
    );

  const repeatClickHandler: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      e => {
        setCurrWord();
        repeatHandler();
      },
      [repeatHandler, setCurrWord]
    );

  return (
    <div
      className={classNames(styles['action-btns'], {
        [styles['apple-pwa']]: isApplePwa
      })}
    >
      <ActionBtn
        action="repeat"
        onClick={repeatClickHandler}
        variant="tertiary"
      />
      <ActionBtn
        action="example"
        onClick={exampleClickHandler}
        variant="primary"
      />
      <ActionBtn
        action="learned"
        onClick={learnedClickHandler}
        variant="secondary"
      />
    </div>
  );
}

export default Actions;
