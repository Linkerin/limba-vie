'use client';

import { createContext, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import db from '../_lib/db';
import { DAY_IN_MS, OBLIGATORY_REVIEW } from '../_lib/constants';

interface IsPracticeNecessaryContextType {
  isNecessary: boolean;
  reason: 'none' | 'mistakes' | 'practice';
  mistakesNum: number;
  lastPractice?: Date;
}

export const IsPracticeNecessaryContext =
  createContext<IsPracticeNecessaryContextType>({
    isNecessary: false,
    reason: 'none',
    mistakesNum: 0,
    lastPractice: undefined
  });

export default function IsPracticeNecessaryProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const mistakenWords = useLiveQuery(
    () =>
      db.wordsLearned
        .filter(word => {
          if (
            word.mistakenLastTime &&
            Date.now() - word.reviewedAt.valueOf() > DAY_IN_MS // only consider mistakes made more than a day ago
          ) {
            return true;
          }

          return false;
        })
        .toArray(),
    [],
    []
  );

  const lastPractice = useLiveQuery(() =>
    db.practices.orderBy('completedAt').last()
  );

  const isPracticeDue = useMemo(() => {
    return lastPractice && lastPractice.completedAt
      ? Date.now() - lastPractice.completedAt.valueOf() >
          OBLIGATORY_REVIEW.PERIOD_WO_REVIEW
      : false;
  }, [lastPractice]);

  const isDisabled = useMemo(
    () => mistakenWords.length >= OBLIGATORY_REVIEW.MISTAKES || isPracticeDue,
    [isPracticeDue, mistakenWords.length]
  );

  const practiceValue: IsPracticeNecessaryContextType = {
    isNecessary: isDisabled,
    reason: isPracticeDue
      ? 'practice'
      : mistakenWords.length >= OBLIGATORY_REVIEW.MISTAKES
        ? 'mistakes'
        : 'none',
    mistakesNum: mistakenWords.length,
    lastPractice: lastPractice?.completedAt
  };

  return (
    <IsPracticeNecessaryContext.Provider value={practiceValue}>
      {children}
    </IsPracticeNecessaryContext.Provider>
  );
}
