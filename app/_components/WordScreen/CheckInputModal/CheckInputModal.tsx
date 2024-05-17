import classNames from 'classnames';

import Button from '../../_ui/Button/Button';
import CheckSound from './CheckSound/CheckSound';
import Portal from '../../_ui/Portal/Portal';

import styles from './CheckInputModal.module.css';

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
      <div className={classNames(styles.modal, styles[status])}>
        {children}
        <Button
          onClick={onBtnClick}
          variant={status === 'success' ? 'secondary' : 'tertiary'}
          autoFocus
        >
          {buttonText}
        </Button>
        <CheckSound status={status} />
      </div>
    </Portal>
  );
}

export default CheckInputModal;
