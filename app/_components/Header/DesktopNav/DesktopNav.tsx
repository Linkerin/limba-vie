'use client';

import Link from 'next/link';

import { NAV_LINKS } from '@/app/_lib/constants';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

import { navStyles, listStyles } from './DesktopNav.styles';

function DesktopNav() {
  const { show, url } = useRepeatBtn();

  return (
    <nav className={navStyles}>
      <ol className={listStyles}>
        {Object.values(NAV_LINKS).map(({ link, label, text }) => (
          <li key={link}>
            <Link href={link} aria-label={label} prefetch>
              {text}
            </Link>
          </li>
        ))}
        {show && (
          <li>
            <Link href={url.href} aria-label="To practice set" prefetch>
              Practice
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
}

export default DesktopNav;
