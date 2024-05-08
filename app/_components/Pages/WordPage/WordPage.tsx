import AudioBtn from '../../AudioBtn/AudioBtn';
import Sentence from '../../WordScreen/Sentence/Sentence';
import Word from '../../WordScreen/Word/Word';
import WordImg from '../../WordScreen/WordImg/WordImg';
import type { WordType } from '@/app/words/[word]/page';

import styles from './WordPage.module.css';

interface WordPageProps {
  word: WordType;
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
          <Word word={word.ro} plural={word.plural} gender={word.gender_ro}>
            {word.audio_name?.length && (
              <AudioBtn
                audioName={word.audio_name}
                word={word.ro}
                autoplay={false}
              />
            )}
          </Word>
          <Sentence className={styles.sentence} wordId={word.id} />
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
