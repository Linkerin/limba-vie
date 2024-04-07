import styles from './Loader.module.css';

function Loader() {
  return (
    <section className={styles.section}>
      <div className={styles.loader} role="status" />
    </section>
  );
}

export default Loader;
