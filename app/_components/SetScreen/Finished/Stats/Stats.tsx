'use client';

import { useMemo } from 'react';
import { cx } from '@/styled-system/css';

import { useSetState } from '@/app/_hooks/useSetProvider';
import { card } from '@/styled-system/recipes';

import { sectionStyles, statContainerStyles } from './Stats.styles';

function Stats() {
  const { mistakesCorrected, mistakesMade, started, words } = useSetState();

  const timeTakenMin = useMemo(() => {
    const totalSeconds = (Date.now() - started.valueOf()) / 1000;
    const sec = (totalSeconds % 60).toFixed(0).padStart(2, '0');
    const min = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');

    return `${min}:${sec}`;
  }, [started]);

  const score = useMemo(() => {
    let percent = ((words.length - mistakesMade) / words.length) * 100;

    return percent.toFixed(0);
  }, [mistakesMade, words.length]);

  return (
    <section className={sectionStyles}>
      <div className={cx(card({ variant: 'success' }), statContainerStyles)}>
        <p>{score} %</p>
        <p>score</p>
      </div>
      <div className={cx(card({ variant: 'primary' }), statContainerStyles)}>
        <p>{timeTakenMin}</p>
        <p>time</p>
      </div>
      {mistakesCorrected > 0 && (
        <div
          className={cx(card({ variant: 'secondary' }), statContainerStyles)}
        >
          <p>{mistakesCorrected}</p>
          <p>corrected</p>
        </div>
      )}
    </section>
  );
}
export default Stats;
