import Link from 'next/link';
import classNames from 'classnames';

import buttonStyles from '../Button/Button.module.css';

export interface ButtonLinkProps
  extends React.ComponentPropsWithRef<typeof Link> {
  fadeAnimation?: boolean;
}

function ButtonLink({
  children,
  className,
  href,
  fadeAnimation = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={classNames(
        buttonStyles.btn,
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
