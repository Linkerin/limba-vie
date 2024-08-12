'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
        className={unitContentStyles}
        aria-label="Click to open a list of unit sets"
        data-completed={completedSetsNum === setIds.length}
      >
        {children}
      </summary>
    </details>
  );
}

export default UnitSummary;
