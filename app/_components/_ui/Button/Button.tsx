'use client';

import { useCallback, useMemo } from 'react';
import { css } from '@/styled-system/css';

import type { ButtonBaseProps } from './Button.types';
import { buttonStyles } from './Button.styles';
import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

export type ButtonProps = ButtonBaseProps &
  React.ComponentPropsWithRef<'button'>;

function Button({
  children,
  css: cssProp,
  fadeAnimation = false,
  variant = 'base',
  vibrate,
  onClick,
  ...props
}: ButtonProps) {
  const styles = useMemo(
    () => css(buttonStyles.raw({ variant }), cssProp),
    [cssProp, variant]
  );

  const isSoundAllowed = useIsSoundAllowed();
  const isVibrationAllowed =
    typeof vibrate === 'boolean' ? vibrate : isSoundAllowed;

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (typeof navigator?.vibrate === 'function' && isVibrationAllowed) {
        navigator.vibrate(40);
      }
      onClick && onClick(e);
    },
    [isVibrationAllowed, onClick]
  );

  return (
    <button className={styles} onClick={onClickHandler} {...props}>
      {children}
    </button>
  );
}

export default Button;
