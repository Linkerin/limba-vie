import { cache } from 'react';
import classNames from 'classnames';

import supabase from '@/app/_lib/supabase';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './Sentence.module.css';

type WordId = Tables<'words'>['id'];

const getSentences = cache(async (id: WordId) => {
  const { data, error } = await supabase
    .from('words')
    .select('example_ro, example_en')
    .eq('id', id);
  if (error) throw error;
  if (!data) return null;

  return data[0];
});

async function Sentence({ wordId }: { wordId: WordId }) {
  const sentences = await getSentences(wordId);

  const noData = !sentences || !sentences.example_ro;

  return (
    <div
      className={classNames(styles['example-container'], {
        [styles.error]: noData
      })}
    >
      {noData ? (
        <p>Oh, the AI hasn&apos;t generated anything yet 🙀</p>
      ) : (
        <>
          <p className={styles.ro}>{sentences.example_ro}</p>
          <p className={styles.en}>{sentences.example_en}</p>
        </>
      )}
    </div>
  );
}

export default Sentence;
