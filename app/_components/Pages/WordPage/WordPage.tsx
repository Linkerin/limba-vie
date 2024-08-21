import Link from 'next/link';
import { notFound } from 'next/navigation';
import { css } from '@/styled-system/css';
import { IconExternalLink } from '@tabler/icons-react';

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
  marginBlock: 'token(spacing.6, 1.5rem) token(spacing.4, 1rem)'
});

const dexLinkStyles = css({
  fontSize: 'xs',
  marginBlockEnd: 'auto',
  width: '90%',

  '& > svg': {
    display: 'inline-block',
    marginInlineStart: '0.25em',
    verticalAlign: '-11.5%'
  },

  '& > span': {
    fontWeight: 'bold'
  }
});

interface WordPageProps {
  word: WordType;
}

function WordPage({ word }: WordPageProps) {
  if (!word) notFound();

  return (
    <section className={sectionStyles}>
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
      <Link
        className={dexLinkStyles}
        aria-label={`External link to '${word.ro}' word page on DEXOnline.ro`}
        href={`https://dexonline.ro/definitie/${encodeURIComponent(word.ro)}`}
        rel="noopener external"
        target="_blank"
        prefetch={false}
      >
        Check the word at <span>dexonline.ro</span>
        <IconExternalLink />
      </Link>
    </section>
  );
}

export default WordPage;
