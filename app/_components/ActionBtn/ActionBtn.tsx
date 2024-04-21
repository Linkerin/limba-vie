import { IconCheck, IconRepeat } from '@tabler/icons-react';
import classNames from 'classnames';

import Button, { ButtonProps } from '../Button/Button';

import styles from './ActionBtn.module.css';

interface ActionBtnProps extends ButtonProps {
  variant: 'repeat' | 'learned';
}

function ActionBtn({ className, variant, ...props }: ActionBtnProps) {
  return (
    <Button
      className={classNames(styles.btn, styles[variant], className)}
      {...props}
    >
      <span>
        {variant === 'repeat' ? (
          <IconRepeat stroke={2} />
        ) : (
          <IconCheck stroke={2} />
        )}
      </span>
      {variant === 'repeat' ? 'Once more' : 'Got it!'}
    </Button>
  );
}

export default ActionBtn;
