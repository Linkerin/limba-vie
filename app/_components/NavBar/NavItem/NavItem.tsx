import Link, { LinkProps } from 'next/link';

import {
  contentContainerStyles,
  itemStyles,
  linkStyles
} from './NavItem.styles';

interface NavItemProps {
  children: React.ReactNode;
  ariaLabel: React.HTMLAttributes<'a'>['aria-label'];
  href: LinkProps['href'];
  isCurrent?: boolean;
  prefetch?: LinkProps['prefetch'];
}

function NavItem({
  children,
  ariaLabel,
  href,
  isCurrent,
  prefetch
}: NavItemProps) {
  return (
    <li className={itemStyles}>
      <Link
        className={linkStyles}
        aria-label={ariaLabel}
        href={href}
        prefetch={prefetch}
      >
        <span className={contentContainerStyles} data-current={isCurrent}>
          {children}
        </span>
      </Link>
    </li>
  );
}

export default NavItem;
