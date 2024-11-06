import Link, { type LinkProps } from 'next/link';
import { css } from '@/styled-system/css';
import type { SystemStyleObject } from '@/styled-system/types';

import { iconContainerStyles, itemStyles, linkStyles } from './NavItem.styles';

interface NavItemProps {
  children: React.ReactNode;
  ariaLabel: React.HTMLAttributes<'a'>['aria-label'];
  css?: SystemStyleObject;
  href: LinkProps['href'];
  isCurrent?: boolean;
  linkContent?: React.ReactNode;
  prefetch?: LinkProps['prefetch'];
}

function NavItem({
  children,
  ariaLabel,
  css: cssProp,
  href,
  isCurrent,
  linkContent,
  prefetch
}: NavItemProps) {
  return (
    <li className={css(itemStyles, cssProp)}>
      <Link
        className={linkStyles}
        aria-label={ariaLabel}
        href={href}
        prefetch={prefetch}
      >
        {linkContent}
        <span
          className={iconContainerStyles}
          data-current={isCurrent}
          aria-hidden="true"
          data-element="nav-item"
        >
          {children}
        </span>
      </Link>
    </li>
  );
}

export default NavItem;
