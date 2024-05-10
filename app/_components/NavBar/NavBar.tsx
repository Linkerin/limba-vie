'use client';

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { IconBook2, IconHome } from '@tabler/icons-react';

import { DeviceContext } from '@/app/_contexts/DeviceProvider';
import NavItem from './NavItem/NavItem';

import styles from './NavBar.module.css';

const NavPracticeBtn = dynamic(
  () => import('./NavPracticeBtn/NavPracticeBtn'),
  { ssr: false }
);

function NavBar() {
  const pathname = usePathname();

  const { isApplePwa } = useContext(DeviceContext);

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
          <NavPracticeBtn />
        </ol>
      </nav>
    </footer>
  ) : null;
}

export default NavBar;
