import Image from 'next/image';

import ErrorView from '@/app/_components/_views/ErrorView/ErrorView';
import ErrorViewFooter from '@/app/_components/_views/ErrorView/ErrorViewFooter';
import sherlockImg from '@/public/images/sherlock.webp';

import { imgStyles, styles } from './NotFoundView.styles';

function NotFoundView() {
  return (
    <ErrorView
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
      <ErrorViewFooter />
    </ErrorView>
  );
}

export default NotFoundView;
