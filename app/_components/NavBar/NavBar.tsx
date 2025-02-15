'use client';

import { usePathname } from 'next/navigation';
import { IconBarbell, IconBook2, IconHome } from '@tabler/icons-react';

import NavItem from './NavItem/NavItem';
import NavPracticeMsg from '@/app/_components/NavPracticeMsg/NavPracticeMsg';
import useIsApplePwa from '@/app/_hooks/useIsApplePwa';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

import {
  footerStyles,
  navContainerStyles,
  navListStyles
} from './NavBar.styles';

function NavBar() {
  const pathname = usePathname();

  const isApplePwa = useIsApplePwa();
  const { show, url } = useRepeatBtn();

  return !pathname?.match(/\/set\/?.*/) ? (
    <footer className={footerStyles} data-apple-pwa={isApplePwa}>
      <nav className={navContainerStyles}>
        <ol className={navListStyles}>
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
            <>
              <NavItem
                ariaLabel="To practice set"
                href={url.href}
                linkContent={<NavPracticeMsg />}
                prefetch
              >
                <IconBarbell />
              </NavItem>
            </>
          )}
        </ol>
      </nav>
    </footer>
  ) : null;
}

export default NavBar;
