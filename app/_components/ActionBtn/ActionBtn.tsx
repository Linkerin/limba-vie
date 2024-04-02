import { IconCheck, IconRepeat } from '@tabler/icons-react';
import classNames from 'classnames';

import styles from './ActionBtn.module.css';

interface ActionBtnProps extends React.ComponentPropsWithRef<'button'> {
  variant: 'repeat' | 'learned';
}

function ActionBtn({ className, variant, ...props }: ActionBtnProps) {
  return (
    <button
      className={classNames(styles.btn, styles[variant], className)}
      {...props}
    >
      <span>
        {variant === 'repeat' && <IconRepeat stroke={2} />}
        {variant === 'learned' && <IconCheck stroke={2} />}
      </span>
      {variant === 'repeat' && 'Once more'}
      {variant === 'learned' && 'Got it!'}
    </button>
  );
}

export default ActionBtn;
