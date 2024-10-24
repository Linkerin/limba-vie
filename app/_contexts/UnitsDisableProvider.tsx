'use client';

import { createContext } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import db from '../_lib/db';
import { OBLIGATORY_REVIEW } from '../_lib/constants';

export const UnitsDisableContext = createContext(false);

export default function UnitsDisableProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const mistakenWords = useLiveQuery(
    () => db.wordsLearned.filter(word => word.mistakenLastTime).toArray(),
    [],
    []
  );

  const lastPractice = useLiveQuery(() =>
    db.practices.orderBy('completedAt').last()
  );

  const isPracticeDue =
    lastPractice && lastPractice.completedAt
      ? Date.now() - lastPractice.completedAt.valueOf() >
        OBLIGATORY_REVIEW.PERIOD_WO_REVIEW
      : false;

  const isDisabled = mistakenWords.length >= OBLIGATORY_REVIEW.MISTAKES;

  return (
    <UnitsDisableContext.Provider value={isDisabled}>
      {children}
    </UnitsDisableContext.Provider>
  );
}
