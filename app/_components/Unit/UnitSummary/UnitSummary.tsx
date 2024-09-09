'use client';

import { useSearchParams } from 'next/navigation';
import { card } from '@/styled-system/recipes';
import { cx } from '@/styled-system/css';

import type { Tables } from '@/app/_lib/supabase.types';
import useCompletedSetsNum from '@/app/_hooks/useCompletedSetsNum';

import { detailsStyles, unitContentStyles } from './UnitSummary.styles';

interface UnitSummaryProps {
  children: React.ReactNode;
  setIds: Tables<'sets_view'>['id'][];
  unitId: Tables<'units_view'>['id'];
}

function UnitSummary({ children, setIds, unitId }: UnitSummaryProps) {
  const seachParams = useSearchParams();
  const openUnitId = seachParams.get('open-unit-id');

  const completedSetsNum = useCompletedSetsNum(setIds);
  const isCompleted = completedSetsNum === setIds.length;

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
