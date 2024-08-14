import { css } from '@/styled-system/css';
import type { SystemStyleObject } from '@/styled-system/types';

import { styles } from './RingSpinner.styles';

type RingSpinnerProps = React.ComponentPropsWithRef<'span'> & {
  css?: SystemStyleObject;
};

function RingSpinner({ css: cssProp = {}, ...props }: RingSpinnerProps) {
  return (
    <span
      className={css(styles, cssProp)}
      role="status"
      {...props}
      data-element="spinner-container"
    >
      <span data-element="spinner-part" />
      <span data-element="spinner-part" />
      <span data-element="spinner-part" />
      <span data-element="spinner-part" />
    </span>
  );
}

export default RingSpinner;
