import { getUnits } from '../_services/dbFetchers';
import UnitItem from '../_components/UnitItem/UnitItem';
import UnitsList from '../_components/UnitsList/UnitsList';

async function Home() {
  const units = await getUnits();

  return (
    <UnitsList>
      {units.map(unit => (
        <UnitItem key={unit.id} unit={unit} />
      ))}
    </UnitsList>
  );
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);

export default Home;
