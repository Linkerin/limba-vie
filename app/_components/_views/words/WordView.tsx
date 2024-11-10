import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IconExternalLink } from '@tabler/icons-react';

import AudioBtn from '@/app/_components/_ui/AudioBtn/AudioBtn';
import Sentence from '@/app/_components/Word/Sentence/Sentence';
import Word from '@/app/_components/Word/Word/Word';
import WordImg from '@/app/_components/Word/WordImg/WordImg';
import WordPlural from '@/app/_components/Word/WordPlural/WordPlural';
import type { WordType } from '@/app/_services/supabase/dbFetchers';

import {
  dexLinkStyles,
  sectionStyles,
  sentenceStyles
} from './WordView.styles';

interface WordViewProps {
  word: WordType;
}

function WordView({ word }: WordViewProps) {
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
      {word.ro_plural && <WordPlural plural={word.ro_plural} />}
      <Sentence
        css={sentenceStyles}
        ro={word.example_ro}
        en={word.example_en}
      />
      <p className={dexLinkStyles}>
        Check the word at{' '}
        <Link
          aria-label={`External link to '${word.ro}' word page on DEXOnline.ro`}
          href={`https://dexonline.ro/definitie/${encodeURIComponent(word.ro)}`}
          rel="noopener external"
          target="_blank"
          prefetch={false}
        >
          dexonline.ro
          <IconExternalLink />
        </Link>
      </p>
    </section>
  );
}

export default WordView;
