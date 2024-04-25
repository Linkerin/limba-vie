import type { Tables } from '@/app/_lib/supabase.types';
import Word from '../../WordScreen/Word/Word';
import WordImg from '../../WordScreen/WordImg/WordImg';

import styles from './WordPage.module.css';

interface WordPageProps {
  word:
    | Pick<
        Tables<'words'>,
        'en' | 'ro' | 'gender_ro' | 'plural' | 'img_name' | 'audio_name'
      >
    | undefined;
  wordParam: string;
}

function WordPage({ word, wordParam }: WordPageProps) {
  return (
    <section className={styles.section}>
      {word ? (
        <>
          <WordImg
            wordEn={word.en}
            gender={word.gender_ro}
            imgName={word.img_name}
          />
          <Word
            word={word.ro}
            plural={word.plural}
            gender={word.gender_ro}
            audioName={word.audio_name}
          />
        </>
      ) : (
        <p>
          Something went wrong and the word &apos;{wordParam}&apos; was not
          found
        </p>
      )}
    </section>
  );
}

export default WordPage;
