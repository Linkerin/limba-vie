import type {
  CompletedSet,
  Practices,
  WordsForRepeat,
  WordsLearned
} from './db';
import type { Tables } from './supabase.types';

export type Gender = Tables<'words'>['gender_ro'];

export interface Progress {
  completedSets: CompletedSet[];
  wordsForRepeat: WordsForRepeat[];
  userId: string;
  created: Date;
}

export interface ProgressV2 {
  completedSets: CompletedSet[];
  practices: Practices[];
  wordsLearned: WordsLearned[];
  userId: string;
  version: number;
  created: Date;
}

export interface RepeatPageSearchParams {
  set: string | string[] | undefined;
  r: string | string[] | undefined;
}

export type WordsArr = Omit<
  Tables<'words'>,
  | 'set_id'
  | 'created_at'
  | 'updated_at'
  | 'example_ro'
  | 'example_en'
  | 'instagram'
>[];
