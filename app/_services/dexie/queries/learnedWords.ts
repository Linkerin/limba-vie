import type { Tables } from '@/app/_lib/supabase.types';

import db, { type WordsLearned } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { DAY_IN_MS } from '@/app/_lib/constants';

export async function getLearnedWord(wordId: Tables<'words'>['id']) {
  const word = await db.wordsLearned.get(wordId);

  return word;
}

interface RecordLearnedWordParams {
  wordId: Tables<'words'>['id'];
  level?: WordsLearned['level'];
  mistaken?: WordsLearned['mistakenLastTime'];
}

export async function recordLearnedWord({
  wordId,
  level = 0,
  mistaken = false
}: RecordLearnedWordParams) {
  const now = new Date();

  const recordId = await db.wordsLearned.add({
    wordId,
    level,
    mistakenLastTime: mistaken,
    correctAtCurrLevel: 0,
    addedAt: now,
    reviewedAt: now
  });

  return recordId;
}

export async function updateLearnedWord(
  wordId: Tables<'words'>['id'],
  updateData: Partial<WordsLearned>
) {
  const result = await db.wordsLearned.update(wordId, updateData);

  return !!result;
}

export function useLiveLearnedWordsSortedByMistaken() {
  return useLiveQuery(() =>
    db.wordsLearned.toCollection().reverse().sortBy('mistakenLastTime')
  );
}

export function useLiveMistakenWords() {
  return useLiveQuery(
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
}
