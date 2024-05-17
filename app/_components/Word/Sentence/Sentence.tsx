'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getSentence, SentenceType } from '@/app/_services/dbFetchers';
import SentenceLoading from './SentenceLoading/SentenceLoading';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './Sentence.module.css';

interface SentenceProps {
  className?: string;
  wordId: Tables<'words'>['id'];
}

function Sentence({ className, wordId }: SentenceProps) {
  const [sentences, setSentences] = useState<SentenceType | 'idle'>('idle');
  useEffect(() => {
    const loadSentences = async () => {
      const sentences = await getSentence(wordId);
      setSentences(sentences);
    };

    loadSentences();
  }, [wordId]);

  if (sentences === 'idle') return <SentenceLoading />;
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
