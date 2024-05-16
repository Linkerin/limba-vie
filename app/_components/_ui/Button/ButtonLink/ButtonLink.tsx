import Link from 'next/link';
import classNames from 'classnames';

import buttonStyles from '../Button.module.css';

export interface ButtonLinkProps
  extends React.ComponentPropsWithRef<typeof Link> {
  fadeAnimation?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

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
