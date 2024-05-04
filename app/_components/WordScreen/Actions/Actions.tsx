'use client';

import { useCallback, useContext } from 'react';
import classNames from 'classnames';

import ActionBtn from '../../ActionBtn/ActionBtn';
import { DeviceContext } from '@/app/_contexts/DeviceProvider';
import type { Tables } from '@/app/_lib/supabase.types';
import useWordHandlers from '../../../_hooks/useWordHandlers';

import styles from './Actions.module.css';

export interface ActionsProps {
  wordId: Tables<'words'>['id'];
  setCurrWord: () => void;
  exampleClickHandler: () => void;
}

function Actions({ exampleClickHandler, setCurrWord, wordId }: ActionsProps) {
  const { isApplePwa } = useContext(DeviceContext);
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
      <ActionBtn variant="repeat" onClick={repeatClickHandler} />
      <ActionBtn variant="example" onClick={exampleClickHandler} />
      <ActionBtn variant="learned" onClick={learnedClickHandler} />
    </div>
  );
}

export default Actions;
