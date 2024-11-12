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

const labels = Object.freeze({
  score: 'Your practice score (out of 100%)',
  time: 'Time taken to complete the practice session',
  revised: 'Number of words you corrected from previous mistakes'
});

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
      <div
        className={scoreStyles}
        aria-label={labels.score}
        title={labels.score}
      >
        <p className={kalam.className}>{score}</p>
      </div>
      <div className={timeStyles} aria-label={labels.time} title={labels.time}>
        <time dateTime={`PT0H${timeTaken.min}M${timeTaken.sec}S`}>
          {timeTaken.min}
          <span>:</span>
          {timeTaken.sec}
        </time>
      </div>
      {mistakesCorrected > 0 && (
        <div
          className={revisedStyles}
          aria-label={labels.revised}
          title={labels.revised}
        >
          <p>{mistakesCorrected}</p>
          <p>revised</p>
        </div>
      )}
    </section>
  );
}
export default Stats;
