import Dexie, { type EntityTable } from 'dexie';
import type { Tables } from './supabase.types';

export interface CompletedSet {
  setId: Tables<'sets_view'>['id'];
  wordsNum: Tables<'sets_view'>['words_count'];
  completedAt: Date;
}

export interface WordsForRepeat {
  wordId: Tables<'words'>['id'];
  repeatTimes: number;
  addedAt: Date;
}

export interface WordsLearned {
  wordId: Tables<'words'>['id'];
  level: 0 | 1 | 2 | 3 | 4 | number;
  mistakenLastTime: boolean;
  correctAtCurrLevel: number;
  addedAt: Date;
  reviewedAt: Date;
}

export interface Practices {
  id: number;
  completedAt: Date;
  score: number | null;
}

const db = new Dexie('LimbaVieDB') as Dexie & {
  completedSets: EntityTable<CompletedSet, 'setId'>;
  practices: EntityTable<Practices, 'id'>;
  wordsForRepeat: EntityTable<WordsForRepeat, 'wordId'>;
  wordsLearned: EntityTable<WordsLearned, 'wordId'>;
};

db.version(2)
  .stores({
    completedSets: 'setId, wordsNum',
    practices: '++id, completedAt',
    wordsForRepeat: 'wordId, repeatTimes, addedAt',
    wordsLearned: 'wordId, level, mistakenLastTime, reviewedAt'
  })
  .upgrade(trans => {
    return trans
      .table('completedSets')
      .toCollection()
      .modify(set => {
        set.wordsNum = set.wordsNum ?? -1; // adds `-1` as default value
      });
  });

export default db;
