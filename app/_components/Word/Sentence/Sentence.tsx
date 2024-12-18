'use client';

import { useEffect, useState } from 'react';
import { css } from '@/styled-system/css';

import {
  getSentence,
  type SentenceType
} from '@/app/_services/supabase/dbFetchers';
import SentenceLoading from './SentenceLoading/SentenceLoading';
import type { SystemStyleObject } from '@/styled-system/types';
import type { Tables } from '@/app/_services/supabase/supabase.types';

import { containerStyles, enStyles, roStyles } from './Sentence.styles';

type SentenceProps = {
  css?: SystemStyleObject;
} & (
  | {
      wordId: Tables<'words'>['id'];
      en?: undefined;
      ro?: undefined;
    }
  | {
      wordId?: undefined;
      en: Tables<'words'>['example_en'];
      ro: Tables<'words'>['example_ro'];
    }
);

function Sentence({ wordId, ro, en, css: cssProp = {} }: SentenceProps) {
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
      className={css(containerStyles, cssProp)}
      data-error={!isLoading && noData}
    >
      {noData ? (
        <p>Oh, the AI hasn&apos;t generated anything yet 🙀</p>
      ) : (
        <>
          <p className={roStyles} lang="ro-RO">
            {ro ?? sentences?.example_ro}
          </p>
          <p className={enStyles}>{en ?? sentences?.example_en}</p>
        </>
      )}
    </div>
  );
}

export default Sentence;
