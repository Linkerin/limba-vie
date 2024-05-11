import type { Tables } from './supabase.types';

export type Gender = Tables<'words'>['gender_ro'];

export interface RepeatPageSearchParams {
  set: string | string[] | undefined;
  r: string | string[] | undefined;
}
