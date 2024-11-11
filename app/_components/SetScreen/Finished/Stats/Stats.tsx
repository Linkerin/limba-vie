'use client';

import { useMemo } from 'react';

import { kalam } from '@/theme/fonts';
import { useSetState } from '@/app/_hooks/useSetProvider';

import {
  sectionStyles,
  timeStyles,
  scoreStyles,
  revisedStyles
} from './Stats.styles';

function Stats() {
  const { mistakesCorrected, mistakesMade, started, words } = useSetState();

  const timeTaken = useMemo(() => {
    const totalSeconds = (Date.now() - started.valueOf()) / 1000;
    const sec = (totalSeconds % 60).toFixed(0).padStart(2, '0');
    const min = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');

    return { min, sec };
  }, [started]);

  const score = useMemo(() => {
    let percent = ((words.length - mistakesMade) / words.length) * 100;

    return percent.toFixed(0);
  }, [mistakesMade, words.length]);

  return (
    <section className={sectionStyles}>
      <div className={scoreStyles}>
        <p className={kalam.className}>{score}</p>
      </div>
      <div className={timeStyles}>
        <p>
          {timeTaken.min}
          <span>:</span>
          {timeTaken.sec}
        </p>
      </div>
      {mistakesCorrected > 0 && (
        <div className={revisedStyles}>
          <p>{mistakesCorrected}</p>
          <p>revised</p>
        </div>
      )}
    </section>
  );
}
export default Stats;
