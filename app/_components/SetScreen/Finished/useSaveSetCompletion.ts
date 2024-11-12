'use client';

import { useEffect } from 'react';

import type { CompletedSet, Practices } from '@/app/_services/dexie/db';
import type { PracticeStats } from './usePracticeStats';
import { putCompletedSet } from '@/app/_services/dexie/queries/completedSets';
import { recordPractice } from '@/app/_services/dexie/queries/practices';

interface UseSaveSetCompletionParams {
  checkPage?: boolean;
  setId: CompletedSet['setId'] | undefined;
  wordsNum: CompletedSet['wordsNum'] | undefined;
  score?: PracticeStats['score'];
  timeTaken?: PracticeStats['timeTaken'];
}

async function recordSetCompletion({
  setId,
  wordsNum
}: Pick<UseSaveSetCompletionParams, 'setId' | 'wordsNum'>) {
  if (!setId || !wordsNum) return false;

  const record = await putCompletedSet({
    setId,
    wordsNum,
    completedAt: new Date()
  });

  if (typeof record !== 'number') return false;
}

async function recordPracticeCompletion({
  score,
  timeTaken
}: Pick<UseSaveSetCompletionParams, 'score' | 'timeTaken'>) {
  const scoreNum = Number(score);

  const payload: Omit<Practices, 'id'> = {
    completedAt: new Date(),
    score: isNaN(scoreNum) ? null : scoreNum,
    timeTakenSec: timeTaken?.totalSeconds ?? null
  };

  await recordPractice(payload);
}

async function useSaveSetCompletion({
  checkPage,
  setId,
  wordsNum,
  score,
  timeTaken
}: UseSaveSetCompletionParams) {
  useEffect(() => {
    if (checkPage) {
      recordPracticeCompletion({ score, timeTaken });
    } else {
      recordSetCompletion({ setId, wordsNum });
    }
  });
}

export default useSaveSetCompletion;
