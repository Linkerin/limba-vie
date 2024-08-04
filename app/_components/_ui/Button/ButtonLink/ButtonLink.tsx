import Link from 'next/link';
import classNames from 'classnames';

import type { ButtonBaseProps } from '../Button';

import buttonStyles from '../Button.module.css';

export type ButtonLinkProps = React.ComponentPropsWithRef<typeof Link> &
  Omit<ButtonBaseProps, 'vibrate'>;

function ButtonLink({
  children,
  className,
  href,
  fadeAnimation = false,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={classNames(
        buttonStyles.btn,
        buttonStyles[variant],
        { [buttonStyles.fade]: fadeAnimation },
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
