import { cache } from 'react';

import ListItemLink from '@/app/_components/ListItemLink/ListItemLink';
import supabase from '@/app/_lib/supabase';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './page.module.css';

const trimVerb = (
  word: Tables<'words'>['ro'],
  gender: Tables<'words'>['gender_ro']
) => {
  let result = word;
  if (!gender && word.slice(0, 2) === 'a ') {
    result = word.slice(2);
  }

  return result;
};

const getWords = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('id, en, ro, gender_ro, plural')
      .order('ro');
    if (error) throw error;

    const roCollator = new Intl.Collator('ro');

    const sortedList = data.sort((a, b) => {
      const lowerAWord = trimVerb(a.ro, a.gender_ro).toLowerCase();
      const lowerBWord = trimVerb(b.ro, b.gender_ro).toLowerCase();

      return roCollator.compare(lowerAWord, lowerBWord);
    });

    return sortedList;
  } catch (err) {
    console.error(err);
    return [];
  }
});

async function DictPage() {
  const words = await getWords();

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

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);

export default DictPage;
