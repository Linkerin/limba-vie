import { capitalizeWord } from '@/app/_lib/utils';
import supabase from '@/app/_lib/supabase';

import styles from './SetItem.module.css';

async function getWordsNum(set: string) {
  try {
    const { count, error } = await supabase
      .from('words')
      .select('set_id!inner(set)', { count: 'exact', head: true })
      .eq('set_id.set', set);

    if (error) throw error;

    return count;
  } catch (err) {
    throw err;
  }
}

async function SetItem({ emoji, set }: { emoji: string; set: string }) {
  const capitalizedSet = capitalizeWord(set);

  const wordsNum = await getWordsNum(set);

  return (
    <li className={styles.section}>
      <span>{emoji}</span>
      <a
        aria-label={`To ${capitalizedSet} words set`}
        href={`/set/${set}`}
        target="_self"
      >
        {capitalizedSet}
      </a>
      <span className={styles['words-number']}>
        {wordsNum} word{wordsNum !== 1 ? 's' : null}
      </span>
    </li>
  );
}

export default SetItem;
