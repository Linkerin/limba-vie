'use client';

import { useRouter } from 'next/navigation';
import { css } from '@/styled-system/css';

import Button from '@/app/_components/_ui/Button/Button';

const styles = css.raw({
  marginBlockStart: 'token(spacing.6, 1.5rem)',
  width: '100%'
});

function OfflineRefreshButton() {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
  };

  return (
    <Button css={styles} onClick={handleClick} variant="primary">
      Refresh page
    </Button>
  );
}

export default OfflineRefreshButton;
