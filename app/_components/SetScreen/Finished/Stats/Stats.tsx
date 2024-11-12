import { kalam } from '@/theme/fonts';
import type { PracticeStats } from '../usePracticeStats';

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

function Stats({ mistakesCorrected, timeTaken, score }: PracticeStats) {
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
