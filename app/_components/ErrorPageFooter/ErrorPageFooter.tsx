'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../Button/Button';
import ButtonLink from '../Button/ButtonLink';

import styles from './ErrorPageFooter.module.css';

function ErrorPageFooter({ reset }: { reset?: () => void }) {
  const router = useRouter();

  const backClickHandler: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      e => {
        e.preventDefault();

        router.back();
      },
      [router]
    );

  return (
    <footer className={styles.footer}>
      {reset && typeof reset === 'function' && (
        <Button onClick={() => reset()}>Try again</Button>
      )}
      <Button
        aria-label="Navigate to the previous page"
        onClick={backClickHandler}
      >
        Go back
      </Button>
      <ButtonLink href="/">Go to homepage</ButtonLink>
    </footer>
  );
}

export default ErrorPageFooter;
