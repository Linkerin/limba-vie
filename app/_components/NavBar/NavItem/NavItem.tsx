import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';

import styles from './NavItem.module.css';

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
    <li
      className={classNames(styles['nav-item'], {
        [styles.current]: isCurrent
      })}
    >
      <Link aria-label={ariaLabel} href={href} prefetch={prefetch}>
        <span>{children}</span>
      </Link>
    </li>
  );
}

export default NavItem;
