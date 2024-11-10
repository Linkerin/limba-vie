'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import ErrorView from './_components/_views/ErrorView/ErrorView';
import ErrorViewFooter from './_components/_views/ErrorView/ErrorViewFooter';

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
    <ErrorView
      heading="Wooow, we've caught an error!"
      text="It will be investigated 🕵"
    >
      <ErrorViewFooter reset={reset} />
    </ErrorView>
  );
}
