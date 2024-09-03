'use client';

import { css } from '@/styled-system/css';

import db from '@/app/_lib/db';
import Button from '../_ui/Button/Button';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

const styles = css.raw({
  fontSize: 'lg',
  marginBlockStart: 'token(spacing.3, 0.75rem)'
});

const clickHandler = async () => {
  if (typeof document === 'undefined') return;

  const setsPromise = db.completedSets.toArray();
  const wordsPromise = db.wordsForRepeat.toArray();

  const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  const [completedSets, wordsForRepeat] = await Promise.all([
    setsPromise,
    wordsPromise
  ]);

  const now = new Date();
  const hash = self.crypto.randomUUID().slice(0, 8);
  const timestamp = new Intl.DateTimeFormat().format(now);
  const jsonString = JSON.stringify(
    { completedSets, wordsForRepeat, userId, created: now.toISOString() },
    null,
    2
  );
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `limba_vie_progress_${timestamp}_${hash}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

function ExportProgress() {
  return (
    <Button css={styles} onClick={clickHandler} variant="primary">
      Download progress
    </Button>
  );
}

export default ExportProgress;
