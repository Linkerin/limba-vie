import dynamic from 'next/dynamic';

import SetItemLoading from '../SetItem/SetItemLoading';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './SetsList.module.css';

const SetItem = dynamic(() => import('../SetItem/SetItem'), {
  loading: () => <SetItemLoading />,
  ssr: false
});

export interface WordsCount {
  words: {
    count: number;
  }[];
}

type Set = Omit<Tables<'sets'>, 'created_at' | 'updated_at'> & WordsCount;

interface SetsListProps {
  sets: Set[];
}

async function SetsList({ sets }: SetsListProps) {
  const units = Array.from(new Set(sets.map(set => set.unit))).sort(
    (a, b) => a - b
  );

  return (
    <>
      {units.map(unit => {
        return (
          <article key={unit} className={styles.article}>
            <h2>Unit {unit}</h2>
            <ul className={styles.list} role="list">
              {sets
                .filter(set => set.unit === unit)
                .map(set => {
                  return <SetItem key={set.id} set={set} />;
                })}
            </ul>
          </article>
        );
      })}
    </>
  );
}

export default SetsList;
