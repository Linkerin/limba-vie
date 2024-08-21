import { css } from '@/styled-system/css';

const styles = css({
  color: 'main',
  cursor: 'default',
  fontSize: '1.375rem',
  marginBottom: 'token(spacing.1, 0.25rem)'
});

interface WordCounterProps {
  current: number;
  total: number;
}

function WordCounter({ current, total }: WordCounterProps) {
  return (
    <p className={styles}>
      {current} / {total}
    </p>
  );
}

export default WordCounter;
