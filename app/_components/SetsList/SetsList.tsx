import dynamic from 'next/dynamic';

import SetItemEmoji from '../SetItem/SetItemEmoji/SetItemEmoji';
import SetItemLink from '../SetItem/SetItemLink/SetItemLink';
import SetItemLoading from '../SetItem/SetItemLoading';
import SetItemWordsNum from '../SetItem/SetItemWordsNum/SetItemWordsNum';
import type { Sets } from '@/app/_services/dbFetchers';

import styles from './SetsList.module.css';

const SetItem = dynamic(() => import('../SetItem/SetItem'), {
  loading: () => <SetItemLoading />,
  ssr: false
});

function SetsList({ sets }: { sets: Sets }) {
  const unitsSet = new Set(sets.map(set => set.unit));
  const units = Array.from(unitsSet).sort((a, b) => {
    if (a === null || b === null) return 0;

    return a - b;
  });

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
                  return (
                    <SetItem key={set.id} setId={set.id}>
                      <SetItemEmoji emoji={set.emoji} />
                      {set.set !== null && <SetItemLink set={set.set} />}
                      <SetItemWordsNum wordsNum={set.words_count} />
                    </SetItem>
                  );
                })}
            </ul>
          </article>
        );
      })}
    </>
  );
}

export default SetsList;
