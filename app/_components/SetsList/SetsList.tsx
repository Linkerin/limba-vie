import { Fragment } from 'react';
import dynamic from 'next/dynamic';

import styles from './SetsList.module.css';

const SetItem = dynamic(() => import('../SetItem/SetItem'), { ssr: false });

async function SetsList({ sets }: { sets: any[] }) {
  const units = Array.from(new Set(sets.map(set => set.unit))).sort(
    (a, b) => a - b
  );

  return (
    <>
      {units.map(unit => {
        return (
          <Fragment key={unit}>
            <h2 className={styles.h2}>Unit {unit}</h2>
            <ul className={styles.list} role="list">
              {sets
                .filter(set => set.unit === unit)
                .map(set => {
                  return <SetItem key={set.id} set={set} />;
                })}
            </ul>
          </Fragment>
        );
      })}
    </>
  );

  // return (
  //   <ul className={styles.list} role="list">
  //     {sets.map(set => {
  //       return <SetItem key={set.id} set={set} />;
  //     })}
  //   </ul>
  // );
}

export default SetsList;
