import UnitItem from '../../UnitItem/UnitItem';
import type { Units } from '@/app/_services/dbFetchers';
import UnitsList from '../../UnitsList/UnitsList';

function HomePage({ units }: { units: Units }) {
  return (
    <UnitsList>
      {units.map(unit => (
        <UnitItem key={unit.id} unit={unit} />
      ))}
    </UnitsList>
  );
}

export default HomePage;
