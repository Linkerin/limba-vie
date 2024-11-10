import Button from '@/app/_components/_ui/Button/Button';
import Portal from '@/app/_components/_ui/Portal/Portal';

import { btnStyles, containerStyles } from './CheckInputModal.styles';

interface CheckInputModalProps {
  children: React.ReactNode;
  onBtnClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonText?: string;
  status?: 'success' | 'error';
}

function CheckInputModal({
  children,
  onBtnClick,
  buttonText = 'Continue',
  status = 'success'
}: CheckInputModalProps) {
  return (
    <Portal>
      <div className={containerStyles} data-status={status}>
        {children}
        <Button
          css={btnStyles}
          onClick={onBtnClick}
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
