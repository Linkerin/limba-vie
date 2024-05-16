import HomePage from '../_components/Pages/HomePage/HomePage';

import { getSets } from '../_services/dbFetchers';

async function Home() {
  const sets = await getSets();

  return <HomePage sets={sets} />;
}

export default Home;

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
