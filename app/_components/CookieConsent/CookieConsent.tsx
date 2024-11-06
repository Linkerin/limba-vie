'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '@/styled-system/css';
import { IconCookie } from '@tabler/icons-react';

import Button from '../_ui/Button/Button';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import Modal, { type ModalState } from '../_ui/Modal/Modal';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

const containerStyles = css.raw({
  animation: 'flipIn 0.4s ease-in'
});

const formStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'token(spacing.3, 0.75rem)'
});

const btnStyles = css.raw({
  marginBlockStart: 'token(spacing.2, 0.5rem)'
});

function CookieConsent() {
  const [modalState, setModalState] = useState<ModalState>('CLOSE');
  const pathname = usePathname();

  const handleClose: React.FormEventHandler = _ => {
    ssrLocalStorage.setItem(LOCAL_STORAGE_KEYS.cookiesConsent, 'true');
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId);
    const cookies = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.cookiesConsent);

    // Cookies consent shouldn't prevent reading pages with legal docs under 'about' route
    if (userId || cookies === 'true' || pathname.includes('/about')) {
      setModalState('CLOSE');
      return;
    }

    setModalState('SHOW_MODAL');
  }, [pathname]);

  return (
    <Modal
      aria-label="Cookies, privacy policy and terms of use consent"
      css={containerStyles}
      role="alertdialog"
      state={modalState}
      showCloseBtn={false}
    >
      <form method="dialog" className={formStyles} onSubmit={handleClose}>
        <p>
          Our application uses strictly necessary cookies <IconCookie />.
        </p>
        <p>
          Before continuing, you agree and accept our{' '}
          <Link
            aria-label="To Privacy Policy page"
            href="/about/legal/privacy-policy"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            aria-label="To Terms of Use page"
            href="/about/legal/terms-of-use"
          >
            Terms of Use
          </Link>
          .
        </p>
        <Button css={btnStyles} variant="base" type="submit" autoFocus>
          Accept
        </Button>
      </form>
    </Modal>
  );
}

export default CookieConsent;
