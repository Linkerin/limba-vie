import { cache } from 'react';

import SetsList from './_components/SetsList/SetsList';
import supabase from '@/app/_lib/supabase';

const getSets = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select('id, set, emoji, head, next_set_id, unit, words(count)')
      .order('unit')
      .order('head', { ascending: false })
      .order('next_set_id');
    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
});

async function Home() {
  const sets = await getSets();

  return <SetsList sets={sets} />;
}

export default Home;

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
