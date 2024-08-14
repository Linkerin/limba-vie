'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '@/styled-system/css';

import Btn from '@/app/_components/_ui/Button/Btn';
import ButtonLink from '@/app/_components/_ui/Button/ButtonLink';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.4,  1rem)',

  '& > a, & > button': {
    width: '100%'
  }
});

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
    <footer className={styles}>
      {reset && typeof reset === 'function' && (
        <Btn onClick={() => reset()} variant="secondary">
          Try again
        </Btn>
      )}
      <Btn
        aria-label="Navigate to the previous page"
        onClick={backClickHandler}
        variant="primary"
      >
        Go back
      </Btn>
      <ButtonLink href="/">Go to homepage</ButtonLink>
    </footer>
  );
}

export default ErrorPageFooter;
