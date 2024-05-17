import { notFound } from 'next/navigation';

import AudioBtn from '../../_ui/AudioBtn/AudioBtn';
import Sentence from '../../Word/Sentence/Sentence';
import Word from '../../Word/Word/Word';
import WordImg from '../../Word/WordImg/WordImg';
import type { WordType } from '@/app/_services/dbFetchers';

import styles from './WordPage.module.css';

interface WordPageProps {
  word: WordType;
}

function WordPage({ word }: WordPageProps) {
  if (!word) notFound();

  return (
    <section className={styles.section}>
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
    </section>
  );
}

export default WordPage;
