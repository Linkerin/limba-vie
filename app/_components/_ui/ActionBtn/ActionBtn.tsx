import { IconCheck, IconMessage2, IconRepeat } from '@tabler/icons-react';
import { css } from '@/styled-system/css';

import Btn, { ButtonProps } from '../Button/Btn';

const styles = css.raw({
  padding: 'token(spacing.2, 0.5rem)',
  '& svg': {
    fontSize: '2.875rem'
  }
});

const ariaLabes = {
  repeat: 'Add the word for repetition',
  learned: 'Mark the word as learned',
  example: 'Show example usage of the word in the sentence'
};

interface ActionBtnProps extends ButtonProps {
  action: 'repeat' | 'learned' | 'example';
}

function ActionBtn({ action, ...props }: ActionBtnProps) {
  return (
    <Btn
      css={styles}
      aria-label={ariaLabes[action]}
      title={ariaLabes[action]}
      {...props}
    >
      <span>
        {action === 'repeat' && <IconRepeat stroke={2} />}
        {action === 'learned' && <IconCheck stroke={2} />}
        {action === 'example' && <IconMessage2 stroke={2} />}
      </span>
    </Btn>
  );
}

export default ActionBtn;
