'use client';

import classNames from 'classnames';

import styles from './Button.module.css';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  fadeAnimation?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

function Button({
  children,
  className,
  fadeAnimation = false,
  variant = 'primary',
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
        if (typeof navigator !== 'undefined') {
          navigator.vibrate(50);
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
