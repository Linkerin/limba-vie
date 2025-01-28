import { css } from '@/styled-system/css';

import TipsNav from '@/app/_components/TipsNav/TipsNav';

const styles = css({
  marginInline: 'auto',
  maxWidth: 'content'
});

function TipsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles}>
      <TipsNav />
      {children}
    </div>
  );
}

export default TipsLayout;
