import dynamic from 'next/dynamic';

import SetItemLoading from '../../SetsList/SetItem/SetItemLoading/SetItemLoading';
import SetItemWordsNum from '../../SetsList/SetItem/SetItemWordsNum/SetItemWordsNum';
import type { Sets } from '@/app/_services/dbFetchers';

import styles from './HomePage.module.css';
import SetItemEmoji from '../../SetsList/SetItem/SetItemEmoji/SetItemEmoji';
import { capitalizeWord } from '@/app/_lib/utils';

const SetItem = dynamic(() => import('../../SetsList/SetItem/SetItem'), {
  loading: () => <SetItemLoading />,
  ssr: false
});

function HomePage({ sets }: { sets: Sets }) {
  const unitsSet = new Set(sets.map(set => set.unit));
  const units = Array.from(unitsSet).sort((a, b) => {
    if (a === null || b === null) return 0;

    return a - b;
  });

  return (
    <>
      {units.map(unit => {
        return (
          <section key={unit} className={styles.section}>
            <h2>Unit {unit}</h2>
            <ul className={styles.list} role="list">
              {sets
                .filter(set => set.unit === unit)
                .map(set => {
                  return (
                    <SetItem key={set.id} set={set.set} setId={set.id}>
                      <SetItemEmoji emoji={set.emoji} />
                      {set.set && capitalizeWord(set.set)}
                      <SetItemWordsNum wordsNum={set.words_count} />
                    </SetItem>
                  );
                })}
            </ul>
          </section>
        );
      })}
    </>
  );
}

export default HomePage;
