'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '@/styled-system/css';

const navStyles = css({
  marginBlockEnd: 'token(spacing.3.5, 0.875rem)'
});

const containerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  border: '0.125rem solid token(colors.main)',
  borderRadius: 'sm',
  borderWidth: '0.125rem',
  listStyleType: 'none',
  padding: 0,
  width: '100%',
  overflow: 'hidden',

  '& > li': {
    position: 'relative',
    textAlign: 'center',
    width: '50%'
  }
});

const linkStyles = css({
  color: 'main',
  display: 'block',
  paddingBlock: 'token(spacing.1.5, 0.375rem) token(spacing.2, 0.5rem)',
  textDecoration: 'none',

  '&[data-current=true]': {
    backgroundColor: 'main.lower',
    color: 'background'
  }
});

function TipsNav() {
  const pathname = usePathname();

  return (
    <nav className={navStyles}>
      <ol className={containerStyles}>
        <li>
          <Link
            className={linkStyles}
            aria-label="To grammar articles"
            href="/tips/grammar"
            data-current={pathname.includes('/tips/grammar')}
            prefetch
          >
            Grammar
          </Link>
        </li>
        <li>
          <Link
            className={linkStyles}
            aria-label="To Romanian dictonary list"
            href="/tips/dict"
            data-current={pathname.includes('/tips/dict')}
            prefetch
          >
            Dictionary
          </Link>
        </li>
      </ol>
    </nav>
  );
}

export default TipsNav;
