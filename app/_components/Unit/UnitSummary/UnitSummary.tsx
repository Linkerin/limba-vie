'use client';

import { useSearchParams } from 'next/navigation';
import { card } from '@/styled-system/recipes';
import { cx } from '@/styled-system/css';

import type { Tables } from '@/app/_lib/supabase.types';
import useCompletedSetsNum, {
  type SetsInfo
} from '@/app/_hooks/useCompletedSetsNum';

import { detailsStyles, unitContentStyles } from './UnitSummary.styles';

interface UnitSummaryProps {
  children: React.ReactNode;
  setsInfo: SetsInfo;
  unitId: Tables<'units_view'>['id'];
}

function UnitSummary({ children, unitId, setsInfo }: UnitSummaryProps) {
  const seachParams = useSearchParams();
  const openUnitId = seachParams.get('open-unit-id');

  const completedSetsNum = useCompletedSetsNum(setsInfo);
  const isCompleted = completedSetsNum === Object.keys(setsInfo)?.length;

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
