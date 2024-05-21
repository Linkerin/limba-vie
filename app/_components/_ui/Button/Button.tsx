'use client';

import classNames from 'classnames';

import styles from './Button.module.css';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  fadeAnimation?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  vibrate?: boolean;
}

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
