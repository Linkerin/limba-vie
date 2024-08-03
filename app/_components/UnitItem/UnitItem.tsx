import dynamic from 'next/dynamic';

import { getUnitSets } from '@/app/_services/actions';
import { IconChevronDown } from '@tabler/icons-react';
import UnitHeading from '../UnitHeading/UnitHeading';
import type { Units } from '@/app/_services/dbFetchers';
import UnitProgress from '../UnitProgress/UnitProgress';
import UnitSummary from '../UnitSummary/UnitSummary';

import styles from './UnitItem.module.css';
import SetItemLinkLoading from '../SetItemLink/SetItemLinkLoading';

const SetItemLink = dynamic(() => import('../SetItemLink/SetItemLink'), {
  loading: () => <SetItemLinkLoading />,
  ssr: false
});

interface UnitItemProps {
  unit: Units[0];
}

async function UnitItem({ unit }: UnitItemProps) {
  const sets = await getUnitSets(unit.id);
  const setIds = sets.map(set => set.id);

  return (
    <li>
      <details className={styles.details}>
        <UnitSummary setIds={setIds}>
          <UnitHeading name={unit.name} image={unit.image} />
          <div className={styles['progress-container']}>
            <UnitProgress setIds={setIds} />
            <span className={styles.arrow}>
              <IconChevronDown role="presentation" />
            </span>
          </div>
        </UnitSummary>
      </details>
      <ol
        className={styles['sets-list']}
        aria-label="List of links to word sets"
      >
        {sets.map(set => (
          <SetItemLink
            key={set.id}
            id={set.id}
            emoji={set.emoji}
            set={set.set}
            wordsNum={set.words_count}
          />
        ))}
      </ol>
    </li>
  );
}

export default UnitItem;
