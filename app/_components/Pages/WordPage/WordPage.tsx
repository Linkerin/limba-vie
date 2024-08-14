import { notFound } from 'next/navigation';
import { css } from '@/styled-system/css';

import AudioBtn from '../../_ui/AudioBtn/AudioBtn';
import Sentence from '../../Word/Sentence/Sentence';
import Word from '../../Word/Word/Word';
import WordImg from '../../Word/WordImg/WordImg';
import type { WordType } from '@/app/_services/dbFetchers';

const sectionStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
  animation: 'fadeIn'
});

const sentenceStyles = css.raw({
  marginBlockStart: 'token(spacing.6, 1.5rem)'
});

interface WordPageProps {
  word: WordType;
}

function WordPage({ word }: WordPageProps) {
  if (!word) notFound();

  return (
    <section className={sectionStyles}>
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
        <Sentence
          css={sentenceStyles}
          ro={word.example_ro}
          en={word.example_en}
        />
      </>
    </section>
  );
}

export default WordPage;
