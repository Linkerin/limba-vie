import Btn from '../../_ui/Button/Btn';
import CheckSound from './CheckSound/CheckSound';
import Portal from '../../_ui/Portal/Portal';

import { css } from '@/styled-system/css';

const containerStyles = css({
  animation: 'move-in 0.5s linear',
  position: 'fixed',
  bottom: '0rem',
  borderRadius: 'token(spacing.2, 0.5rem) token(spacing.2, 0.5rem) 0 0',
  fontSize: 'xl',
  padding:
    'token(spacing.6, 1.5rem) token(spacing.4, 1rem) token(spacing.8, 2rem)',
  width: '100%',
  zIndex: 10,

  '&[data-status="success"]': {
    backgroundColor: 'success.container',
    color: 'on-success-container'
  },

  '&[data-status="error"]': {
    backgroundColor: 'secondary.container',
    color: 'on-secondary-container'
  }
});

const btnStyles = css.raw({
  marginBlockStart: 'token(spacing.6, 1.5rem)',
  width: '100%',

  _focusVisible: {
    outline: 'none'
  }
});

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
        <Btn
          css={btnStyles}
          onClick={onBtnClick}
          variant={status === 'success' ? 'success' : 'secondary'}
          autoFocus
        >
          {buttonText}
        </Btn>
        <CheckSound status={status} />
      </div>
    </Portal>
  );
}

export default CheckInputModal;
