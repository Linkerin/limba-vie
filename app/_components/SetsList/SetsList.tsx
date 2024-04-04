import supabase from '@/app/_lib/supabase';

import SetItem from '../SetItem/SetItem';

import styles from './SetsList.module.css';

async function getSets() {
  try {
    const { data, error } = await supabase
      .from('sets')
      .select('id, set, emoji, words(count)');
    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
}

async function SetsList() {
  const sets = await getSets();

  return (
    <ul className={styles.list} role="list">
      {sets.map(set => {
        return <SetItem key={set.id} set={set} />;
      })}
    </ul>
  );
}

export default SetsList;
