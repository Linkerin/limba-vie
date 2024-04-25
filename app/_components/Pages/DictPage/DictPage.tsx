import ListItemLink from '@/app/_components/ListItemLink/ListItemLink';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './DictPage.module.css';

type WordType = Pick<
  Tables<'words'>,
  'id' | 'en' | 'ro' | 'gender_ro' | 'plural'
>;

function DictPage({ words }: { words: WordType[] }) {
  return (
    <>
      <p className={styles.total}>
        Total words: <span>{words.length}</span>
      </p>
      <ol className={styles.list}>
        {words.map(word => (
          <li key={word.id}>
            <div className={styles.column}>
              <ListItemLink
                className={styles.ro}
                aria-label="Romanian word"
                href={`/words/${encodeURIComponent(word.en)}`}
              >
                {word.ro}
              </ListItemLink>
              {word.gender_ro && (
                <span className={styles.info} aria-label="Romanian word gender">
                  {' '}
                  {word.gender_ro}
                </span>
              )}
              {word.plural && (
                <span
                  className={styles.info}
                  aria-label={`${word.ro} is plural`}
                >
                  {word.gender_ro ? ', ' : null} pl.
                </span>
              )}
            </div>
            <div className={styles.column}>
              <span className={styles.en} aria-label="English translation">
                {word.en}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default DictPage;
