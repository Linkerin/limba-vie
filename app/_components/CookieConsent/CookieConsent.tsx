'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '../_ui/Button/Button';
import { LOCAL_STORAGE_KEYS } from '@/app/_lib/constants';
import Modal from '../_ui/Modal/Modal';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

import styles from './CookieConsent.module.css';

function CookieConsent() {
  const [show, setShow] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userId = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.userId);
    const cookies = ssrLocalStorage.getItem(LOCAL_STORAGE_KEYS.cookiesConsent);

    // Cookies consent shouldn't prevent reading pages with legal docs under 'about' route
    if (userId || cookies === 'true' || pathname.includes('/about')) {
      setShow(false);
      return;
    }

    setShow(true);
  }, [pathname]);

  const handleClose: React.MouseEventHandler = _ => {
    ssrLocalStorage.setItem(LOCAL_STORAGE_KEYS.cookiesConsent, 'true');
    setShow(false);
  };

  return show ? (
    <Modal
      showCloseBtn={false}
      containerClassName={styles.container}
      cardClassName={styles.card}
    >
      <p>Our application uses strictly necessary cookies 🍪.</p>
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
      <Button className={styles.btn} onClick={handleClose}>
        Accept
      </Button>
    </Modal>
  ) : null;
}

export default CookieConsent;
