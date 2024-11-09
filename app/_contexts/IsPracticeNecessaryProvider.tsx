'use client';

import { createContext, useMemo } from 'react';

import { OBLIGATORY_REVIEW } from '@/app/_lib/constants';
import { useLiveLastPractice } from '@/app/_services/dexie/queries/practices';
import { useLiveMistakenWords } from '@/app/_services/dexie/queries/learnedWords';

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
  const mistakenWords = useLiveMistakenWords();
  const lastPractice = useLiveLastPractice();

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
