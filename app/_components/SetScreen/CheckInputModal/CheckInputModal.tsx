'use client';

import Button from '@/app/_components/_ui/Button/Button';
import Portal from '@/app/_components/_ui/Portal/Portal';
import { useSetNextWord } from '../../../_hooks/useSetProvider';

import { btnStyles, containerStyles } from './CheckInputModal.styles';

interface CheckInputModalProps {
  children: React.ReactNode;
  buttonText?: string;
  status?: 'success' | 'error';
}

function CheckInputModal({
  children,
  buttonText = 'Continue',
  status = 'success'
}: CheckInputModalProps) {
  const setNextWord = useSetNextWord();

  return (
    <Portal>
      <div className={containerStyles} data-status={status}>
        {children}
        <Button
          css={btnStyles}
          onClick={setNextWord}
          variant={status === 'success' ? 'success' : 'secondary'}
          autoFocus
        >
          {buttonText}
        </Button>
      </div>
    </Portal>
  );
}

export default CheckInputModal;
