'use client';

import { useCallback } from 'react';
import { css } from '@/styled-system/css';

import ActionBtn from '../../_ui/ActionBtn/ActionBtn';
import type { Tables } from '@/app/_lib/supabase.types';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useWordHandlers from '../../../_hooks/useWordHandlers';

const styles = css({
  backgroundColor: 'background',
  display: 'flex',
  justifyContent: 'space-around',
  paddingBlock: 'token(spacing.4, 1rem)',
  width: '100%',

  '&[data-apple-pwa=true]': {
    paddingBlockEnd: 'apple-pwa-pd'
  }
});

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
    <div className={styles} data-apple-pwa={isApplePwa}>
      <ActionBtn
        action="learned"
        onClick={learnedClickHandler}
        variant="success"
      />
      <ActionBtn
        action="example"
        onClick={exampleClickHandler}
        variant="primary"
      />
      <ActionBtn
        action="repeat"
        onClick={repeatClickHandler}
        variant="secondary"
      />
    </div>
  );
}

export default Actions;
