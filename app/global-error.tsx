'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import Button from './_components/_ui/Button/Button';
import ButtonLink from './_components/_ui/Button/ButtonLink/ButtonLink';
import Header from './_components/Header/Header';
import NavBar from './_components/NavBar/NavBar';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const resetClickHandler = () => reset();

  useEffect(() => {
    Sentry.captureException(error, {
      extra: { info: 'Error was caught by global-error' }
    });
  }, [error]);

  return (
    <html>
      <body>
        <Header />
        <main style={{ height: '100%' }}>
          <h1>Oh no, something went wrong</h1>
          <p>We are sorry!</p>
          <footer style={{ marginBlock: '2rem' }}>
            <ButtonLink style={{ width: '100%' }} href="/">
              Go to homepage
            </ButtonLink>
            <Button
              style={{ marginTop: '1rem', width: '100%' }}
              onClick={resetClickHandler}
            >
              Try again
            </Button>
          </footer>
        </main>
        <NavBar />
      </body>
    </html>
  );
}
