import Link from 'next/link';

import { NAV_LINKS } from '@/app/_lib/constants';

import { navStyles, listStyles } from './DesktopNav.styles';

function DesktopNav() {
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
      </ol>
    </nav>
  );
}

export default DesktopNav;
