'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { css } from '@/styled-system/css';

import Btn from './_components/_ui/Button/Button';
import ButtonLink from './_components/_ui/Button/ButtonLink';
import Header from './_components/Header/Header';
import NavBar from './_components/NavBar/NavBar';

const mainStyles = css({
  height: '100%',
  paddingBlockStart: 'token(spacing.10, 2.5rem)',
  marginInline: 'auto',
  maxWidth: 'content',
  textAlign: 'center',

  '& > p': {
    fontSize: 'token(fontSizes.2xl, 1.5rem)'
  }
});

const footerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.4, 1rem)',
  marginBlock: 'token(spacing.4, 1rem)',
  marginInline: 'auto',
  width: '60dvw',

  '& a, & button': {
    width: '100%'
  }
});

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
        <main className={mainStyles}>
          <h1>Oh no, something went wrong</h1>
          <p>We are sorry!</p>
          <footer className={footerStyles}>
            <ButtonLink href="/">Go to homepage</ButtonLink>
            <Btn onClick={resetClickHandler} variant="secondary">
              Try again
            </Btn>
          </footer>
        </main>
        <NavBar />
      </body>
    </html>
  );
}
