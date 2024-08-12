'use client';

import { useMemo } from 'react';
import { css } from '@/styled-system/css';

import type { ButtonBaseProps } from './Button.types';
import { buttonStyles } from './Button.styles';

type ButtonProps = ButtonBaseProps & React.ComponentPropsWithRef<'button'>;

function Btn({
  children,
  css: cssProp,
  fadeAnimation = false,
  variant = 'base',
  vibrate = true,
  onClick,
  ...props
}: ButtonProps) {
  const styles = useMemo(
    () => css(buttonStyles.raw({ variant }), cssProp),
    [cssProp, variant]
  );

  return (
    <button
      className={styles}
      onClick={e => {
        if (typeof navigator?.vibrate === 'function' && vibrate) {
          navigator.vibrate(40);
        }
        onClick && onClick(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Btn;
