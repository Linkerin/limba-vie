import { css } from '@/styled-system/css';
import type { SystemStyleObject } from '@/styled-system/types';

import AudioBtn from '@/app/_components/_ui/AudioBtn/AudioBtn';
import {
  audioBtnStyles,
  containerStyles,
  sentenceStyles,
  roSentenceStyles,
  translationStyles
} from './GrammarExampleSentence.styles';

interface GrammarExampleSentenceProps
  extends React.ComponentPropsWithoutRef<'div'> {
  sentence: string;
  translation: string;
  audioName?: string;
  audioFolder?: string;
  css?: SystemStyleObject;
}

function GrammarExampleSentence({
  className,
  sentence,
  translation,
  audioName,
  audioFolder,
  css: cssProp = {},
  ...props
}: GrammarExampleSentenceProps) {
  return (
    <div className={css(containerStyles, cssProp)} {...props}>
      <div className={sentenceStyles}>
        {audioName && audioFolder && (
          <AudioBtn
            css={audioBtnStyles}
            ariaLabel="Play example sentense in Romanian"
            audioName={audioName}
            folders={audioFolder}
            autoplay={false}
          />
        )}
        <p className={roSentenceStyles} lang="ro-RO">
          {sentence}
        </p>
      </div>
      <p className={translationStyles}>{translation}</p>
    </div>
  );
}

export default GrammarExampleSentence;
