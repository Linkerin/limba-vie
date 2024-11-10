'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '@/styled-system/css';

import Button from '@/app/_components/_ui/Button/Button';
import ButtonLink from '@/app/_components/_ui/Button/ButtonLink';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.4,  1rem)',
  marginBlock: 'token(spacing.2, 0.5rem)',
  width: '100%',

  '& > a, & > button': {
    width: '100%'
  }
});

function ErrorViewFooter({ reset }: { reset?: () => void }) {
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
    <footer className={styles}>
      {reset && typeof reset === 'function' && (
        <Button onClick={() => reset()} variant="secondary">
          Try again
        </Button>
      )}
      <Button
        aria-label="Navigate to the previous page"
        onClick={backClickHandler}
        variant="primary"
      >
        Go back
      </Button>
      <ButtonLink href="/" variant="primary">
        Go to homepage
      </ButtonLink>
    </footer>
  );
}

export default ErrorViewFooter;
