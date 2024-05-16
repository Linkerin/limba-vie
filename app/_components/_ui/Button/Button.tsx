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
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
