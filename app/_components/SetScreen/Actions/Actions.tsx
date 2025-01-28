'use client';

import { useCallback } from 'react';
import { css } from '@/styled-system/css';

import ActionBtn from '../../_ui/ActionBtn/ActionBtn';
import type { Tables } from '@/app/_services/supabase/supabase.types';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useWordHandlers from './useWordHandlers';

import { containerStyles, exampleButtonStyles } from './Actions.styles';

export interface ActionsProps {
  wordId: Tables<'words'>['id'];
  setCurrWord: () => void;
  exampleClickHandler: () => void;
}

function Actions({ exampleClickHandler, setCurrWord, wordId }: ActionsProps) {
  const isApplePwa = useIsApplePwa();
  const { learnedButtonHandler, repeatButtonHandler } = useWordHandlers({
    wordId
  });

  const learnedClickHandler: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      e => {
        setCurrWord();
        learnedButtonHandler();
      },
      [learnedButtonHandler, setCurrWord]
    );

  const repeatClickHandler: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      e => {
        setCurrWord();
        repeatButtonHandler();
      },
      [repeatButtonHandler, setCurrWord]
    );

  return (
    <div className={containerStyles} data-apple-pwa={isApplePwa}>
      <ActionBtn
        action="learned"
        onClick={learnedClickHandler}
        variant="success"
      />
      <ActionBtn
        action="example"
        onClick={exampleClickHandler}
        variant="primary"
        css={exampleButtonStyles}
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
