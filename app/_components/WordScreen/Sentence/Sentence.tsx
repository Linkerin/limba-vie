import classNames from 'classnames';

import { getSentence } from '@/app/_services/dbFetchers';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './Sentence.module.css';

interface SentenceProps {
  className?: string;
  wordId: Tables<'words'>['id'];
}

async function Sentence({ className, wordId }: SentenceProps) {
  const sentences = await getSentence(wordId);

  const noData = !sentences || !sentences.example_ro;

  return (
    <div
      className={classNames(
        styles['example-container'],
        { [styles.error]: noData },
        className
      )}
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
