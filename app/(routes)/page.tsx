import { getUnits } from '../_services/dbFetchers';
import HomePage from '../_components/Pages/HomePage/HomePage';
async function Home() {
  const units = await getUnits();

  return <HomePage units={units} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);

export default Home;
