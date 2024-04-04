import { IconBalloon } from '@tabler/icons-react';

import { capitalizeWord } from '@/app/_lib/utils';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

import styles from './Finished.module.css';

function saveSetCompletion(setId: number) {
  const key = 'lvCompletedSets';
  const completedSets = ssrLocalStorage.getItem(key);

  if (!completedSets) {
    ssrLocalStorage.setItem(key, JSON.stringify([setId]));
  } else {
    const completedSetsArr = JSON.parse(completedSets);
    completedSetsArr.push(setId);
    const uniqueSetIds = Array.from(new Set(completedSetsArr));
    ssrLocalStorage.setItem(key, JSON.stringify(uniqueSetIds));
  }

  return true;
}

interface FinishedProps {
  set: {
    id: number;
    set: string;
  };
}

function Finished({ set }: FinishedProps) {
  // saveSetCompletion(set.id);

  return (
    <>
      <IconBalloon className={styles.icon} />
      <p className={styles.msg}>
        You have finished the <span>{capitalizeWord(set.set)}</span> set!
      </p>
      <a className={styles.btn} aria-label="To homepage" href="/">
        Continue
      </a>
    </>
  );
}

export default Finished;
