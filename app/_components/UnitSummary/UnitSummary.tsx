'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getCompletedSetsNum } from '@/app/_lib/utils';

import styles from './UnitSummary.module.css';

interface UnitSummaryProps {
  children: React.ReactNode;
  setIds: (number | null)[];
}

function UnitSummary({ children, setIds }: UnitSummaryProps) {
  const [completedSetsNum, setCompletedSetsNum] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setsNum = getCompletedSetsNum(setIds);
    if (typeof setsNum === 'number') {
      setCompletedSetsNum(setsNum);
    }
  }, [setIds]);

  return (
    <summary
      className={classNames(styles.unit, {
        [styles.completed]: completedSetsNum === setIds.length
      })}
      aria-label="Click to open a list of unit sets"
    >
      {children}
    </summary>
  );
}

export default UnitSummary;
