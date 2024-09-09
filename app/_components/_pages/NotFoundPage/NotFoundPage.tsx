import Image from 'next/image';
import { css } from '@/styled-system/css';

import ErrorPage from '../ErrorPage/ErrorPage';
import ErrorPageFooter from '../ErrorPage/ErrorPageFooter/ErrorPageFooter';
import sherlockImg from '@/public/images/sherlock.webp';

const imgStyles = css({
  height: '25dvh',
  marginBlockEnd: 'token(spacing.6, 1.5rem)',
  width: 'auto'
});

const styles = css({
  color: 'secondary',
  fontSize: '6xl'
  // lineHeight: '1.125em'
});

function NotFoundPage() {
  return (
    <ErrorPage
      heading="Not Found"
      text="Seems like we don't have this page yet"
      precedingElement={
        <div>
          <Image
            className={imgStyles}
            alt="Cute bull character that looks like Sherlock Holmes standing with a magnifier"
            src={sherlockImg}
            priority
          />
          <p className={styles}>404</p>
        </div>
      }
    >
      <ErrorPageFooter />
    </ErrorPage>
  );
}

export default NotFoundPage;
