import dynamic from 'next/dynamic';

import styles from './SetsList.module.css';

const SetItem = dynamic(() => import('../SetItem/SetItem'), { ssr: false });

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
