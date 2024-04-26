import classNames from 'classnames';

import AudioBtn from '../AudioBtn/AudioBtn';

import styles from './ExampleSentence.module.css';

interface ExampleSentenceProps extends React.ComponentPropsWithoutRef<'div'> {
  sentence: string;
  translation: string;
  audioName?: string;
  audioFolder?: string;
}

function ExampleSentence({
  className,
  sentence,
  translation,
  audioName,
  audioFolder,
  ...props
}: ExampleSentenceProps) {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      <div className={styles.sentence}>
        {audioName && audioFolder && (
          <AudioBtn
            className={styles['audio-btn']}
            ariaLabel="Play example sentense in Romanian"
            audioName={audioName}
            folders={audioFolder}
            autoplay={false}
          />
        )}
        <p>{sentence}</p>
      </div>
      <p className={styles.translation}>{translation}</p>
    </div>
  );
}

export default ExampleSentence;
