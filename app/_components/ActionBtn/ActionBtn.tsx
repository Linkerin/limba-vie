import { IconCheck, IconMessage2, IconRepeat } from '@tabler/icons-react';
import classNames from 'classnames';

import Button, { ButtonProps } from '../Button/Button';

import styles from './ActionBtn.module.css';

const ariaLabes = {
  repeat: 'Add the word for repetition',
  learned: 'Mark the word as learned',
  example: 'Show example usage of the word in the sentence'
};

interface ActionBtnProps extends ButtonProps {
  variant: 'repeat' | 'learned' | 'example';
}

function ActionBtn({ className, variant, ...props }: ActionBtnProps) {
  return (
    <Button
      className={classNames(styles.btn, styles[variant], className)}
      aria-label={ariaLabes[variant]}
      title={ariaLabes[variant]}
      {...props}
    >
      <span>
        {variant === 'repeat' && <IconRepeat stroke={2} />}
        {variant === 'learned' && <IconCheck stroke={2} />}
        {variant === 'example' && <IconMessage2 stroke={2} />}
      </span>
    </Button>
  );
}

export default ActionBtn;
