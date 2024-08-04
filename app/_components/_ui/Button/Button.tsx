'use client';

import classNames from 'classnames';

import styles from './Button.module.css';

export interface ButtonBaseProps {
  fadeAnimation?: boolean;
  variant?: 'primary' | 'secondary' | 'green' | 'base';
  vibrate?: boolean;
}
export type ButtonProps = React.ComponentPropsWithRef<'button'> &
  ButtonBaseProps;

function Button({
  children,
  className,
  fadeAnimation = false,
  variant = 'primary',
  vibrate = true,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.btn,
        styles[variant],
        { [styles.fade]: fadeAnimation },
        className
      )}
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

export default Button;
