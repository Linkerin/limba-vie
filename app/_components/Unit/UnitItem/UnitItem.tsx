import dynamic from 'next/dynamic';
import { IconChevronDown } from '@tabler/icons-react';

import { getUnitSets } from '@/app/_services/dbFetchers';
import type { SetsInfo } from '@/app/_services/dexie/queries/completedSets';
import UnitSetLinkLoading from '../UnitSetLink/UnitSetLinkLoading';
import UnitHeading from '../UnitHeading/UnitHeading';
import type { Units } from '@/app/_services/dbFetchers';
import UnitProgress from '../UnitProgress/UnitProgress';
import UnitSummary from '../UnitSummary/UnitSummary';

import {
  arrowIconStyles,
  liStyles,
  progressContainerStyles,
  setsListStyles
} from './UnitItem.styles';

const UnitSetLink = dynamic(() => import('../UnitSetLink/UnitSetLink'), {
  loading: () => <UnitSetLinkLoading />,
  ssr: false
});

interface UnitItemProps {
  unit: Units[0];
}

async function UnitItem({ unit }: UnitItemProps) {
  const sets = await getUnitSets(unit.id);
  const setsInfo: SetsInfo = Object.fromEntries(
    sets.map(set => [set.id, { wordsNum: set.words_count }])
  );

  return (
    <li
      id={`unit-${unit.id}`}
      className={liStyles}
      aria-label={`'${unit.name}' unit`}
    >
      <UnitSummary unitId={unit.id} setsInfo={setsInfo}>
        <UnitHeading name={unit.name} image={unit.image} />
        <div className={progressContainerStyles}>
          <UnitProgress setsInfo={setsInfo} />
          <span className={arrowIconStyles} data-element="accordion-arrow">
            <IconChevronDown role="presentation" />
          </span>
        </div>
      </UnitSummary>
      <ol
        className={setsListStyles}
        aria-label="List of links to word sets"
        data-element="sets-list"
      >
        {sets.map(set =>
          set.id ? (
            <UnitSetLink
              key={set.id}
              id={set.id}
              emoji={set.emoji}
              set={set.set}
              wordsNum={set.words_count}
            />
          ) : null
        )}
      </ol>
    </li>
  );
}

export default UnitItem;
