import RingSpinner from '../RingSpinner/RingSpinner';

import styles from './Loader.module.css';

function Loader() {
  return (
    <section className={styles.section}>
      <RingSpinner />
    </section>
  );
}

export default Loader;
