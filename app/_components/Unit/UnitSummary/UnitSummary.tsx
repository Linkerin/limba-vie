'use client';

import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { card } from '@/styled-system/recipes';
import { cx } from '@/styled-system/css';

import type { Tables } from '@/app/_lib/supabase.types';
import { UnitsDisableContext } from '@/app/_contexts/UnitsDisableProvider';
import useCompletedSetsNum, {
  type SetsInfo
} from '@/app/_hooks/useCompletedSetsNum';

import {
  detailsStyles,
  practiceMarkStyles,
  unitContentStyles
} from './UnitSummary.styles';

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

  const isUnitDisabled = useContext(UnitsDisableContext);

  return (
    <details
      className={detailsStyles}
      open={openUnitId === unitId?.toString()}
      data-disabled={isUnitDisabled}
    >
      <summary
        className={cx(
          card({ variant: isCompleted ? 'success' : 'base' }),
          unitContentStyles
        )}
        aria-label="Click to open a list of unit sets"
        data-completed={isCompleted}
        tabIndex={isUnitDisabled ? -1 : 0}
      >
        {isUnitDisabled && (
          <div className={practiceMarkStyles}>
            <p>Practice first</p>
          </div>
        )}
        {children}
      </summary>
    </details>
  );
}

export default UnitSummary;
