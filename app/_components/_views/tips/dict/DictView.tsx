import Link from 'next/link';
import { cx } from '@/styled-system/css';

import type { Dict } from '@/app/_services/supabase/dbFetchers';
import LearnedWordWrapper from './LearnedWordWrapper/LearnedWordWrapper';
import { linkOverlay } from '@/styled-system/patterns';

import {
  columnStyles,
  listStyles,
  roInfoStyles,
  roWordStyles,
  totalStyles
} from './DictView.styles';

function DictView({ words }: { words: Dict }) {
  return (
    <>
      <p className={totalStyles}>
        Total words: <span>{words.length}</span>
      </p>
      <ol className={listStyles}>
        {words.map(word => (
          <li key={word.id}>
            <div className={columnStyles}>
              <Link
                className={cx(linkOverlay(), roWordStyles)}
                aria-label={`To the '${word.en}' word page`}
                href={`/words/${encodeURIComponent(word.en)}`}
              >
                <LearnedWordWrapper setId={word.set_id} wordId={word.id}>
                  {word.ro}
                </LearnedWordWrapper>
              </Link>
              {word.gender_ro && (
                <span
                  className={roInfoStyles}
                  aria-label="Romanian word gender"
                >
                  {' '}
                  {word.gender_ro}
                </span>
              )}
              {word.plural && (
                <span
                  className={roInfoStyles}
                  aria-label={`${word.ro} is plural`}
                >
                  {word.gender_ro ? ', ' : null} pl.
                </span>
              )}
            </div>
            <div className={columnStyles}>
              <span aria-label="English translation">{word.en}</span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default DictView;
