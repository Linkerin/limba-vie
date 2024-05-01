import NotFoundFooter from '../../NotFoundFooter/NotFoundFooter';

import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.section}>
      <div className={styles['not-found']}>
        <p>404</p>
        <h1>Not Found</h1>
      </div>
      <p>Seems like we don&apos;t have this page yet</p>
      <NotFoundFooter />
    </section>
  );
}

export default NotFoundPage;
