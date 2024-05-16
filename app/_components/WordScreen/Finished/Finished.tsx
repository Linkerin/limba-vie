import Image from 'next/image';
import taurImg from '@/public/taur.svg';

import ButtonLink from '../../_ui/Button/ButtonLink/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils';
import FinishedSound from './FinishedSound/FinishedSound';
import type { Tables } from '@/app/_lib/supabase.types';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { SetInfo } from '@/app/_services/dbFetchers';

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
  setInfo?: SetInfo;
  setName?: Tables<'sets'>['set'];
}

function Finished({ setInfo, setName }: FinishedProps) {
  if (setInfo?.id) saveSetCompletion(setInfo.id);

  const homePath = setInfo?.prev_set_id ? `/#set-${setInfo.prev_set_id}` : '/';
  const set = setName ?? setInfo?.set ?? '';

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
          You have finished the <span>{capitalizeWord(set)}</span> set!
        </p>
      </div>
      <FinishedSound />
      <ButtonLink
        className={styles.btn}
        aria-label="To homepage"
        href={homePath}
        prefetch
      >
        Continue
      </ButtonLink>
    </>
  );
}

export default Finished;
