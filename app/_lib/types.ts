import type { CompletedSet, WordsForRepeat } from './db';
import type { Tables } from './supabase.types';

export type Gender = Tables<'words'>['gender_ro'];

export interface Progress {
  completedSets: CompletedSet[];
  wordsForRepeat: WordsForRepeat[];
  userId: string;
  created: Date;
}

export interface RepeatPageSearchParams {
  set: string | string[] | undefined;
  r: string | string[] | undefined;
}

export type SetIdsArr = (number | null)[];
