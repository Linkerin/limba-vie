import Link from 'next/link';
import { css } from '@/styled-system/css';

import type { ButtonBaseProps } from './Button.types';
import { buttonStyles } from './Button.styles';

export type ButtonLinkProps = React.ComponentPropsWithRef<typeof Link> &
  Omit<ButtonBaseProps, 'vibrate'>;

function ButtonLink({
  children,
  href,
  css: cssProp,
  fadeAnimation = false,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={css(buttonStyles.raw({ variant }), cssProp)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
