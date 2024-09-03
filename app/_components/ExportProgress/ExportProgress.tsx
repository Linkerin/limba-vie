'use client';

import { css } from '@/styled-system/css';

import Button from '../_ui/Button/Button';
import { generateProgressJson } from './exportUtils';

const styles = css.raw({
  fontSize: 'lg',
  marginBlockStart: 'token(spacing.3, 0.75rem)'
});

const clickHandler = async () => {
  if (typeof document === 'undefined') return;

  generateProgressJson();
};

function ExportProgress() {
  return (
    <Button css={styles} onClick={clickHandler} variant="primary">
      Download progress
    </Button>
  );
}

export default ExportProgress;
