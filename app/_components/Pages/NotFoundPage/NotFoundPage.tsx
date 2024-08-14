import { css } from '@/styled-system/css';

import ErrorPage from '../ErrorPage/ErrorPage';
import ErrorPageFooter from '../ErrorPage/ErrorPageFooter/ErrorPageFooter';

const styles = css({
  color: 'secondary',
  fontSize: '8xl'
});

function NotFoundPage() {
  return (
    <ErrorPage
      heading="Not Found"
      text="Seems like we don't have this page yet"
      precedingElement={<p className={styles}>404</p>}
    >
      <ErrorPageFooter />
    </ErrorPage>
  );
}

export default NotFoundPage;
