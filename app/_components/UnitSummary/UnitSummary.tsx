'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import { getCompletedSetsNum } from '@/app/_lib/utils';
import { Tables } from '@/app/_lib/supabase.types';

import styles from './UnitSummary.module.css';

interface UnitSummaryProps {
  children: React.ReactNode;
  setIds: (number | null)[];
  unitId: Tables<'units_view'>['id'];
}

function UnitSummary({ children, setIds, unitId }: UnitSummaryProps) {
  const [completedSetsNum, setCompletedSetsNum] = useState<number | null>(null);
  const seachParams = useSearchParams();
  const openUnitId = seachParams.get('open-unit-id');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setsNum = getCompletedSetsNum(setIds);
    if (typeof setsNum === 'number') {
      setCompletedSetsNum(setsNum);
    }
  }, [setIds]);

  return (
    <details
      className={styles.details}
      open={openUnitId === unitId?.toString()}
    >
      <summary
        className={classNames(styles.unit, {
          [styles.completed]: completedSetsNum === setIds.length
        })}
        aria-label="Click to open a list of unit sets"
      >
        {children}
      </summary>
    </details>
  );
}

export default UnitSummary;
