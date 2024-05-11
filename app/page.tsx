import SetsList from './_components/SetsList/SetsList';

import { getSets } from './_services/dbFetchers';

async function Home() {
  const sets = await getSets();

  return <SetsList sets={sets} />;
}

export default Home;

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
