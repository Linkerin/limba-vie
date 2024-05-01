'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../Button/Button';
import ButtonLink from '../Button/ButtonLink';

import styles from './NotFoundFooter.module.css';

function NotFoundFooter() {
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
      <ButtonLink href="/">Go to homepage</ButtonLink>
      <Button
        aria-label="Navigate to the previous page"
        onClick={backClickHandler}
      >
        Go back
      </Button>
    </footer>
  );
}

export default NotFoundFooter;
