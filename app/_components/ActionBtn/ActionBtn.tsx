import { IconCheck, IconMessage2, IconRepeat } from '@tabler/icons-react';
import classNames from 'classnames';

import Button, { ButtonProps } from '../_ui/Button/Button';

import styles from './ActionBtn.module.css';

const ariaLabes = {
  repeat: 'Add the word for repetition',
  learned: 'Mark the word as learned',
  example: 'Show example usage of the word in the sentence'
};

interface ActionBtnProps extends ButtonProps {
  action: 'repeat' | 'learned' | 'example';
}

function ActionBtn({ className, action, ...props }: ActionBtnProps) {
  return (
    <Button
      className={classNames(styles.btn, className)}
      aria-label={ariaLabes[action]}
      title={ariaLabes[action]}
      {...props}
    >
      <span>
        {action === 'repeat' && <IconRepeat stroke={2} />}
        {action === 'learned' && <IconCheck stroke={2} />}
        {action === 'example' && <IconMessage2 stroke={2} />}
      </span>
    </Button>
  );
}

export default ActionBtn;
