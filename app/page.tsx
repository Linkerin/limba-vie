import { cache } from 'react';

import type { Set } from './_components/SetsList/SetsList';
import SetsList from './_components/SetsList/SetsList';
import supabase from '@/app/_lib/supabase';

const getSets = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select('id, set, emoji, head, next_set_id, unit, words(count)')
      .order('unit')
      .order('head', { ascending: false });
    if (error) throw error;

    const sortedSets: Set[] = [];
    const sets = {
      sets: data,
      [Symbol.iterator]() {
        let set = this.sets.find(set => set.head);

        return {
          next: () => {
            if (set) {
              const currSet = set;
              set = this.sets.find(setElem => setElem.id === set?.next_set_id);

              return { value: currSet, done: false };
            } else {
              return { value: undefined, done: true };
            }
          }
        };
      }
    };

    for (const set of sets) {
      if (set) sortedSets.push(set);
    }

    return sortedSets;
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
