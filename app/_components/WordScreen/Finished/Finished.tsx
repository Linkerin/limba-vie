import Image from 'next/image';
import Link from 'next/link';
import taurImg from '@/public/taur.svg';

import { capitalizeWord } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';
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
  setId?: Tables<'sets'>['id'];
  setName?: Tables<'sets'>['set'];
}

function Finished({ setId, setName }: FinishedProps) {
  if (setId) saveSetCompletion(setId);

  return (
    <>
      <div className={styles['img-msg-container']}>
        <Image
          className={styles.img}
          alt="Bourel mascot image congratilating with set completon"
          src={taurImg}
          priority
        />
        <p className={styles.msg}>
          You have finished the{' '}
          {setName ? <span>{capitalizeWord(setName)}</span> : null} set!
        </p>
      </div>
      <Link className={styles.btn} aria-label="To homepage" href="/">
        Continue
      </Link>
    </>
  );
}

export default Finished;
