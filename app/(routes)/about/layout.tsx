import { css } from '@/styled-system/css';

const styles = css({
  marginInline: 'auto',
  maxWidth: 'content'
});

function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export default AboutLayout;
