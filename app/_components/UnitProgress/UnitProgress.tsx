'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getCompletedSetsNum } from '@/app/_lib/utils';
import type { SetIdsArr } from '@/app/_lib/types';
import Skeleton from '../_ui/Skeleton/Skeleton';

import styles from './UnitProgress.module.css';

function UnitProgress({ setIds }: { setIds: SetIdsArr }) {
  const [completedSetsNum, setCompletedSetsNum] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setsNum = getCompletedSetsNum(setIds);
    if (typeof setsNum === 'number') {
      setCompletedSetsNum(setsNum);
    }
  }, [setIds]);

  return (
    <Skeleton isLoaded={completedSetsNum !== null} width="100%" fitContent>
      <p id="progress" aria-label="Unit completion progress">
        {completedSetsNum ?? 0} / {setIds.length} sets
      </p>
      <progress
        aria-labelledby="progress"
        className={classNames(styles.progress, {
          [styles.completed]: completedSetsNum === setIds.length
        })}
        value={completedSetsNum ?? 0}
        max={setIds.length}
      />
    </Skeleton>
  );
}

export default UnitProgress;
