import styles from './WordCounter.module.css';

interface WordCounterProps {
  current: number;
  total: number;
}

function WordCounter({ current, total }: WordCounterProps) {
  return (
    <p className={styles.counter}>
      {current} / {total}
    </p>
  );
}

export default WordCounter;
