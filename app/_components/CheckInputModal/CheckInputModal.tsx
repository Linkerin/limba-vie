import classNames from 'classnames';

import Button from '../Button/Button';
import Portal from '../Portal/Portal';

import styles from './CheckInputModal.module.css';

interface CheckInputModalProps {
  message: string;
  onBtnClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonText?: string;
  status?: 'success' | 'info' | 'error';
}

function CheckInputModal({
  message,
  onBtnClick,
  buttonText = 'Continue',
  status = 'success'
}: CheckInputModalProps) {
  return (
    <Portal>
      <div className={classNames(styles.modal, styles[status])}>
        <p>{message}</p>
        <Button
          onClick={onBtnClick}
          variant={status === 'success' ? 'secondary' : 'tertiary'}
        >
          {buttonText}
        </Button>
      </div>
    </Portal>
  );
}

export default CheckInputModal;
