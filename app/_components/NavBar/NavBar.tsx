'use client';

import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { IconBarbell, IconBook2, IconHome } from '@tabler/icons-react';

import NavItem from './NavItem/NavItem';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

import styles from './NavBar.module.css';

function NavBar() {
  const pathname = usePathname();

  const isApplePwa = useIsApplePwa();
  const { show, url } = useRepeatBtn();

  return !pathname?.match(/\/set\/?.*/) ? (
    <footer
      className={classNames(styles.footer, {
        [styles['apple-pwa']]: isApplePwa
      })}
    >
      <nav>
        <ol>
          <NavItem
            ariaLabel="To main page with units list"
            href="/"
            isCurrent={pathname === '/'}
          >
            <IconHome />
          </NavItem>
          <NavItem
            ariaLabel="To grammar articles"
            href="/tips/grammar"
            isCurrent={pathname?.includes('/tips/')}
            prefetch
          >
            <IconBook2 />
          </NavItem>
          {show && (
            <NavItem ariaLabel="To practice set" href={url.href} prefetch>
              <IconBarbell />
            </NavItem>
          )}
        </ol>
      </nav>
    </footer>
  ) : null;
}

export default NavBar;
