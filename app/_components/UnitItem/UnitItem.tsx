import dynamic from 'next/dynamic';
import { IconChevronDown } from '@tabler/icons-react';

import { getUnitSets } from '@/app/_services/actions';
import SetItemLinkLoading from '../SetItemLink/SetItemLinkLoading';
import UnitHeading from '../UnitHeading/UnitHeading';
import type { Units } from '@/app/_services/dbFetchers';
import UnitProgress from '../UnitProgress/UnitProgress';
import UnitSummary from '../UnitSummary/UnitSummary';

import {
  arrowIconStyles,
  progressContainerStyles,
  setsListStyles
} from './UnitItem.styles';

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
    <li id={`unit-${unit.id}`}>
      <UnitSummary setIds={setIds} unitId={unit.id}>
        <UnitHeading name={unit.name} image={unit.image} />
        <div className={progressContainerStyles}>
          <UnitProgress setIds={setIds} />
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
            <SetItemLink
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
