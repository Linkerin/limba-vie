import { css } from '@/styled-system/css';

const styles = css({
  fontSize: 'sm',
  marginBlockStart: 'token(spacing.1, 0.25rem)',
  width: '90%',

  '& > span': {
    color: 'main.lower',
    fontStyle: 'italic'
  }
});

function WordPlural({ plural }: { plural: string }) {
  return (
    <p className={styles}>
      <span>pl.:</span> {plural}
    </p>
  );
}

export default WordPlural;
