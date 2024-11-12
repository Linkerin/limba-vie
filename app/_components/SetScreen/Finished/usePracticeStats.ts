'use client';

import { useMemo } from 'react';

import { useSetState } from '@/app/_hooks/useSetProvider';

function usePracticeStats() {
  const { mistakesCorrected, mistakesMade, started, words } = useSetState();

  const timeTaken = useMemo(() => {
    const totalSeconds = (Date.now() - started.valueOf()) / 1000;
    const sec = (totalSeconds % 60).toFixed(0).padStart(2, '0');
    const min = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');

    return { min, sec, totalSeconds };
  }, [started]);

  const score = useMemo(() => {
    let percent = ((words.length - mistakesMade) / words.length) * 100;

    return percent.toFixed(0);
  }, [mistakesMade, words.length]);

  return { timeTaken, score, mistakesCorrected };
}

export type PracticeStats = ReturnType<typeof usePracticeStats>;

export default usePracticeStats;
