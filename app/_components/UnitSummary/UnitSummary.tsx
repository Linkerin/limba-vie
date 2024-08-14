'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { card } from '@/styled-system/recipes';
import { cx } from '@/styled-system/css';

import { detailsStyles, unitContentStyles } from './UnitSummary.styles';
import { getCompletedSetsNum } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';

interface UnitSummaryProps {
  children: React.ReactNode;
  setIds: (number | null)[];
  unitId: Tables<'units_view'>['id'];
}

function UnitSummary({ children, setIds, unitId }: UnitSummaryProps) {
  const [completedSetsNum, setCompletedSetsNum] = useState<number | null>(null);
  const seachParams = useSearchParams();
  const openUnitId = seachParams.get('open-unit-id');

  const isCompleted = useMemo(
    () => completedSetsNum === setIds.length,
    [completedSetsNum, setIds.length]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setsNum = getCompletedSetsNum(setIds);
    if (typeof setsNum === 'number') {
      setCompletedSetsNum(setsNum);
    }
  }, [setIds]);

  return (
    <details className={detailsStyles} open={openUnitId === unitId?.toString()}>
      <summary
        className={cx(
          card({ variant: isCompleted ? 'success' : 'base' }),
          unitContentStyles
        )}
        aria-label="Click to open a list of unit sets"
        data-completed={isCompleted}
      >
        {children}
      </summary>
    </details>
  );
}

export default UnitSummary;
