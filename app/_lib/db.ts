import Dexie, { type EntityTable } from 'dexie';
import type { Tables } from './supabase.types';

export interface CompletedSet {
  setId: Tables<'sets'>['id'];
  completedAt: string;
}

export interface WordsForRepeat {
  wordId: Tables<'words'>['id'];
  repeatTimes: number;
  addedAt: string;
}

const db = new Dexie('LimbaVieDB') as Dexie & {
  completedSets: EntityTable<CompletedSet, 'setId'>;
  wordsForRepeat: EntityTable<WordsForRepeat, 'wordId'>;
};

db.version(1).stores({
  completedSets: 'setId, completedAt',
  wordsForRepeat: 'wordId, repeatTimes, addedAt'
});

export default db;
