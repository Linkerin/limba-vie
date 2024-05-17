'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getSentence, SentenceType } from '@/app/_services/dbFetchers';
import SentenceLoading from './SentenceLoading/SentenceLoading';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './Sentence.module.css';

interface SentenceProps {
  className?: string;
  wordId?: Tables<'words'>['id'];
  en?: Tables<'words'>['example_en'];
  ro?: Tables<'words'>['example_ro'];
}

function Sentence({ className, wordId, ro, en }: SentenceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [sentences, setSentences] = useState<SentenceType>();

  useEffect(() => {
    const loadSentences = async () => {
      if (ro || !wordId) return;
      try {
        setIsLoading(true);
        const sentences = await getSentence(wordId);
        setSentences(sentences);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    loadSentences();
  }, [wordId, ro]);

  const noData = !ro && (!sentences || !sentences?.example_ro);

  return isLoading ? (
    <SentenceLoading />
  ) : (
    <div
      className={classNames(
        styles['example-container'],
        { [styles.error]: !isLoading && noData },
        className
      )}
    >
      {noData ? (
        <p>Oh, the AI hasn&apos;t generated anything yet 🙀</p>
      ) : (
        <>
          <p className={styles.ro}>{ro ?? sentences?.example_ro}</p>
          <p className={styles.en}>{en ?? sentences?.example_en}</p>
        </>
      )}
    </div>
  );
}

export default Sentence;
