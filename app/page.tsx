import { cache } from 'react';

import SetsList from './_components/SetsList/SetsList';
import supabase from '@/app/_lib/supabase';

const getSets = cache(async () => {
  const { data, error } = await supabase
    .from('sorted_sets')
    .select('id, set, emoji, words_count, unit');
  if (error) throw error;

  return data;
});

async function Home() {
  const sets = await getSets();

  return <SetsList sets={sets} />;
}

export default Home;

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
