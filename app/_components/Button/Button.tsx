'use client';

import classNames from 'classnames';

import styles from './Button.module.css';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  fadeAnimation?: boolean;
}

function Button({
  children,
  className,
  fadeAnimation = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.btn,
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
