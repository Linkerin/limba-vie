import Link, { type LinkProps } from 'next/link';
import type { SystemStyleObject } from '@/styled-system/types';
import { css } from '@/styled-system/css';

import {
  contentContainerStyles,
  itemStyles,
  linkStyles
} from './NavItem.styles';

interface NavItemProps {
  children: React.ReactNode;
  ariaLabel: React.HTMLAttributes<'a'>['aria-label'];
  animate?: boolean;
  css?: SystemStyleObject;
  href: LinkProps['href'];
  isCurrent?: boolean;
  prefetch?: LinkProps['prefetch'];
}

function NavItem({
  children,
  ariaLabel,
  animate,
  css: cssProp,
  href,
  isCurrent,
  prefetch
}: NavItemProps) {
  return (
    <li className={css(itemStyles, cssProp)} data-animate={animate}>
      <Link
        className={linkStyles}
        aria-label={ariaLabel}
        href={href}
        prefetch={prefetch}
      >
        <span
          className={contentContainerStyles}
          data-current={isCurrent}
          aria-hidden="true"
        >
          {children}
        </span>
      </Link>
    </li>
  );
}

export default NavItem;
