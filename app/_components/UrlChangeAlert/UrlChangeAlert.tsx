'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '@/styled-system/css';
import { IconExternalLink } from '@tabler/icons-react';

const noShowUrls = [
  'limba.ravenplan.com',
  'localhost',
  'preview--limba.netlify.app'
];

const containerStyles = css({
  position: 'sticky',
  top: '0',
  backgroundColor: 'secondary.container-low',
  boxShadow: 'lg',
  height: 'fit-content',
  marginBlockEnd: 'token(spacing.4, 1rem)',
  padding: 'token(spacing.4, 1rem) token(spacing.6, 1.5rem)',
  zIndex: 20,

  '& p': {
    marginBlockEnd: '1'
  },

  '& svg': {
    display: 'inline-block'
  },

  '& i': {
    fontStyle: 'italic'
  },

  '& strong': {
    color: 'secondary.darker'
  },

  '& time': {
    fontStyle: 'italic'
  }
});

const headingStyles = css({
  color: 'secondary.darker',
  fontSize: '3xl'
});

function UrlChangeAlert() {
  const [url, setUrl] = useState('localhost');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setUrl(window.location.hostname);
  }, []);

  return noShowUrls.includes(url) || pathname.includes('/about') ? null : (
    <section className={containerStyles}>
      <h1 className={headingStyles}>We are moving!</h1>
      <p>
        Instead of <i>limba.vercel.app</i>, our new domain will be{' '}
        <Link
          aria-label="External link to the new app address"
          href="https://limba.ravenplan.com"
        >
          limba.ravenplan.com <IconExternalLink />
        </Link>
        .
      </p>
      <p>
        We kindly ask you to transfer your current progress there. From{' '}
        <time dateTime="2024-10-15">October, 15th</time> this link{' '}
        <strong>will not be available</strong>.
      </p>
      <p>
        You can find the transfer instruction{' '}
        <Link
          aria-label="To progress tranfer insructions page"
          href="/about/progress-transfer"
        >
          here
        </Link>
        .
      </p>
    </section>
  );
}

export default UrlChangeAlert;
