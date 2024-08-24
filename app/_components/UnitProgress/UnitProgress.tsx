'use client';

import { css } from '@/styled-system/css';

import type { SetIdsArr } from '@/app/_lib/types';
import Skeleton from '../_ui/Skeleton/Skeleton';
import useCompletedSetsNum from '@/app/_hooks/useCompletedSetsNum';

const borderWidth = '1px';

const styles = css({
  border: `${borderWidth} solid token(colors.main)`,
  borderRadius: 'xs',
  height: 'token(sizes.2, 0.5rem)',
  marginBlockStart: 'token(spacing.0.5, 0.125rem)',
  width: '50%',

  '&::-moz-progress-bar, &::-webkit-progress-bar': {
    backgroundColor: 'transparent',
    borderRadius: 'xs'
  },

  '&::-webkit-progress-value': {
    backgroundColor: 'primary',
    borderRadius: `calc(token(radii.xs, 2px) - ${borderWidth})`
  },

  '&[data-completed=true]': {
    '&::-webkit-progress-value': {
      backgroundColor: 'success'
    }
  }
});

function UnitProgress({ setIds }: { setIds: SetIdsArr }) {
  const completedSetsNum = useCompletedSetsNum(setIds);

  return (
    <Skeleton
      isLoaded={completedSetsNum !== null}
      style={{ width: '100%' }}
      fitContent
    >
      <p id="progress" aria-label="Unit completion progress">
        {completedSetsNum ?? 0} / {setIds.length} sets
      </p>
      <progress
        aria-labelledby="progress"
        className={styles}
        value={completedSetsNum ?? 0}
        max={setIds.length}
        data-completed={completedSetsNum === setIds.length}
      />
    </Skeleton>
  );
}

export default UnitProgress;
