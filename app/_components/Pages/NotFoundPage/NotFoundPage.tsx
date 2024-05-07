import ErrorPage from '../ErrorPage/ErrorPage';
import ErrorPageFooter from '../../ErrorPageFooter/ErrorPageFooter';

import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <ErrorPage
      heading="Not Found"
      text="Seems like we don't have this page yet"
      precedingElement={<p className={styles['not-found']}>404</p>}
    >
      <ErrorPageFooter />
    </ErrorPage>
  );
}

export default NotFoundPage;
