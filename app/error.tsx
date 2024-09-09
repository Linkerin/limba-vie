'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import ErrorPage from './_components/_pages/ErrorPage/ErrorPage';
import ErrorPageFooter from './_components/_pages/ErrorPage/ErrorPageFooter/ErrorPageFooter';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorPage
      heading="Wooow, we've caught an error!"
      text="It will be investigated 🕵"
    >
      <ErrorPageFooter reset={reset} />
    </ErrorPage>
  );
}
