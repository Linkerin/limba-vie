import { css } from '@/styled-system/css';

import UnitItem from '../../Unit/UnitItem/UnitItem';
import type { Units } from '@/app/_services/dbFetchers';

const styles = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 'token(spacing.4, 1rem)',
  listStyle: 'none',
  padding: '0rem'
});

function HomePage({ units }: { units: Units }) {
  return (
    <ol className={styles} role="list" aria-label="Units with word sets">
      {units.map(unit => (
        <UnitItem key={unit.id} unit={unit} />
      ))}
    </ol>
  );
}

export default HomePage;
