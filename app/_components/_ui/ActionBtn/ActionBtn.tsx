import { IconCheck, IconMessage2, IconRepeat } from '@tabler/icons-react';
import { css } from '@/styled-system/css';

import Button, { type ButtonProps } from '../Button/Button';

import { btnStyles, labelStyles } from './ActionBtn.styles';

const ariaLabes = {
  repeat: 'Add the word for repetition',
  learned: 'Mark the word as learned',
  example:
    'Show plural variant (if applicable) and an example usage of the word in context'
};

interface ActionBtnProps extends ButtonProps {
  action: 'repeat' | 'learned' | 'example';
}

function ActionBtn({ action, css: cssProp, ...props }: ActionBtnProps) {
  return (
    <Button
      css={css.raw({ ...btnStyles, ...cssProp })}
      aria-label={ariaLabes[action]}
      title={ariaLabes[action]}
      {...props}
    >
      <span aria-hidden="true">
        {action === 'repeat' && <IconRepeat stroke={2} />}
        {action === 'learned' && <IconCheck stroke={2} />}
        {action === 'example' && <IconMessage2 stroke={2} />}
      </span>
      <span className={labelStyles}>
        {action === 'repeat' && 'Repeat'}
        {action === 'learned' && 'Got it!'}
      </span>
    </Button>
  );
}

export default ActionBtn;
