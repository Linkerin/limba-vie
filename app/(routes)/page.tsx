import { getUnits } from '../_services/supabase/dbFetchers';
import HomeView from '../_components/_views/home/HomeView';
async function HomePage() {
  const units = await getUnits();

  return <HomeView units={units} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);

export default HomePage;
