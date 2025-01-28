import { css } from '@/styled-system/css';

const styles = css({
  marginInline: 'auto',
  maxWidth: 'content'
});

function WordsLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export default WordsLayout;
