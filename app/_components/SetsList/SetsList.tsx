import SetItem from '../SetItem/SetItem';

import styles from './SetsList.module.css';

async function SetsList({ sets }: { sets: any[] }) {
  return (
    <ul className={styles.list} role="list">
      {sets.map(set => {
        return <SetItem key={set.id} set={set} />;
      })}
    </ul>
  );
}

export default SetsList;
