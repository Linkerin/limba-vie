import Link from 'next/link';
import { cx } from '@/styled-system/css';

import { ARTICLES } from '@/app/_lib/constants';
import { card } from '@/styled-system/recipes';
import { linkOverlay } from '@/styled-system/patterns';

import { linkStyles, liStyles } from './GrammarView.styles';

function GrammarView() {
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

export default GrammarView;
