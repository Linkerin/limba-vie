import styles from './UnitsList.module.css';

function UnitsList({ children }: { children: React.ReactNode }) {
  return (
    <ol className={styles.list} role="list" aria-label="Units with word sets">
      {children}
    </ol>
  );
}

export default UnitsList;
