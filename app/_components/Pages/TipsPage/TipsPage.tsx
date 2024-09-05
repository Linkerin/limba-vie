import Link from 'next/link';

import { ARTICLES } from '@/app/_lib/constants';
import { card } from '@/styled-system/recipes';
import { css, cx } from '@/styled-system/css';
import { linkOverlay } from '@/styled-system/patterns';

const liStyles = css({
  color: 'main',
  fontSize: '1.375rem',
  padding: 'token(spacing.4, 1rem) token(spacing.3, 0.75rem)',
  position: 'relative',
  whiteSpace: 'nowrap',
  width: ' 100%',
  zIndex: 0,

  '&:not(:last-of-type)': {
    marginBlockEnd: 'token(spacing.3, 0.75rem)'
  }
});

const linkStyles = css({
  lineHeight: '1.25em',
  textDecoration: 'none',
  userSelect: 'none',
  whiteSpace: 'normal',

  '&, &:visited': {
    color: 'main'
  }
});

function TipsPage() {
  return (
    <ol>
      {Object.values(ARTICLES).map(val => (
        <li key={val.link} className={cx(card(), liStyles)}>
          <Link
            aria-label={`To ${val.title} grammar article`}
            href={`/tips/grammar/${val.link}`}
            className={cx(linkOverlay(), linkStyles)}
          >
            {val.title}
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default TipsPage;
