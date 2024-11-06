'use client';

import { useContext, useMemo } from 'react';

import { IsPracticeNecessaryContext } from '@/app/_contexts/IsPracticeNecessaryProvider';
import { OBLIGATORY_REVIEW } from '@/app/_lib/constants';

import { sectionStyles } from './NavPracticeMsg.styles';

function NavPracticeMsg() {
  const { isNecessary, reason, mistakesNum, lastPractice } = useContext(
    IsPracticeNecessaryContext
  );

  const practiceMsg = useMemo(() => {
    switch (reason) {
      case 'mistakes': {
        const msg = `You have ${mistakesNum} mistakes. Time to reduce them to ${OBLIGATORY_REVIEW.MISTAKES}`;
        return msg;
      }

      case 'practice': {
        if (lastPractice) {
          const daysPassed = Math.floor(
            (Date.now() - lastPractice.getTime()) / (1000 * 60 * 60 * 24)
          );
          return `You haven't practiced for ${daysPassed} days`;
        }

        return "It's time to practice";
      }

      default:
        return '';
    }
  }, [reason, lastPractice, mistakesNum]);

  return isNecessary ? (
    <section className={sectionStyles}>
      <p>{practiceMsg}</p>
    </section>
  ) : null;
}

export default NavPracticeMsg;
