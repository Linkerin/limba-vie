'use client';

import { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@/styled-system/css';

import type { ButtonBaseProps } from './Button.types';
import { buttonStyles } from './Button.styles';
import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

const RingSpinner = dynamic(() => import('../RingSpinner/RingSpinner'));

export type ButtonProps = ButtonBaseProps &
  React.ComponentPropsWithRef<'button'>;

function Button({
  children,
  css: cssProp,
  fadeAnimation = false,
  variant = 'base',
  disabled,
  loading,
  loadingText = 'Loading...',
  onClick,
  vibrate,
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
    <button
      className={styles}
      onClick={onClickHandler}
      {...props}
      disabled={loading ?? disabled}
      aria-disabled={loading ?? disabled}
    >
      {loading ? (
        <>
          <RingSpinner />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
