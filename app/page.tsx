import { cache } from 'react';

import SetsList from './_components/SetsList/SetsList';
import supabase from '@/app/_lib/supabase';

const getSets = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select('id, set, emoji, words(count)');
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

export const revalidate = 3600;
