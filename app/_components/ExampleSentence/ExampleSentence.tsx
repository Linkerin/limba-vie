import AudioBtn from '../AudioBtn/AudioBtn';

import styles from './ExampleSentence.module.css';

interface ExampleSentenceProps {
  sentence: string;
  translation: string;
  audioName?: string;
  audioFolder?: string;
}

function ExampleSentence({
  sentence,
  translation,
  audioName,
  audioFolder
}: ExampleSentenceProps) {
  return (
    <div className={styles.container}>
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
