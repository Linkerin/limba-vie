import RingSpinner from '../../../_ui/RingSpinner/RingSpinner';

import styles from './SentenceLoading.module.css';

function SentenceLoading() {
  return (
    <div className={styles.spinner}>
      <RingSpinner />
    </div>
  );
}

export default SentenceLoading;
