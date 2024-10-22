'use server';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';

import { REPEAT_WORDS_CTY } from '../_lib/constants';
import type { RepeatPageSearchParams, WordsArr } from '../_lib/types';
import supabase from '../_lib/supabase';
import type { Tables } from '../_lib/supabase.types';
import { trimVerb } from '../_lib/utils';

export const getDict = cache(async () => {
  const { data, error } = await supabase
    .from('words')
    .select('id, en, ro, gender_ro, plural, set_id')
    .order('ro');
  if (error) throw error;

  const roCollator = new Intl.Collator('ro');

  const sortedList = data.sort((a, b) => {
    const lowerAWord = trimVerb(a.ro, a.gender_ro).toLowerCase();
    const lowerBWord = trimVerb(b.ro, b.gender_ro).toLowerCase();

    return roCollator.compare(lowerAWord, lowerBWord);
  });

  return sortedList;
});

export type Dict = Awaited<ReturnType<typeof getDict>>;

export async function getPrevUnitId(unitId: Tables<'units_view'>['id']) {
  if (!unitId) return null;

  const { data, error } = await supabase
    .from('units_view')
    .select('prev_unit')
    .eq('id', unitId);
  if (error) throw error;

  return data.at(0)?.prev_unit;
}

const FIELDS = `id,
                en,
                en_alternatives,
                ro,
                ro_plural,
                gender_ro,
                plural,
                img_name,
                audio_name`;

interface getRepeatSetsParams {
  setId: Tables<'words'>['set_id'];
  ids: (string | undefined)[];
  words: WordsArr;
}
const getRepeatSets = async ({ setId, ids, words }: getRepeatSetsParams) => {
  const { data, error } = await supabase
    .from('words')
    .select(FIELDS)
    .eq('set_id', setId)
    .not('id', 'in', `(${ids.join(',')})`);
  if (error) throw error;

  return [...words, ...data];
};

export const getRepeatWords = async ({ set, r }: RepeatPageSearchParams) => {
  let words: WordsArr = [];

  const ids = Array.isArray(r) ? r : [r];
  if (r && r.length > 0) {
    const { data, error } = await supabase
      .from('words')
      .select(FIELDS)
      .in('id', ids);
    if (error) throw error;

    words = data;
  }

  if (words.length >= REPEAT_WORDS_CTY) return words;
  if (!set || set.length <= 0) return words;

  if (!Array.isArray(set)) {
    words = await getRepeatSets({ setId: parseInt(set), ids, words });

    return words.slice(0, REPEAT_WORDS_CTY);
  }

  for (const setId of set) {
    if (words.length >= REPEAT_WORDS_CTY) {
      return words.slice(0, REPEAT_WORDS_CTY);
    }

    words = await getRepeatSets({ setId: parseInt(setId), ids, words });
  }

  return words.slice(0, REPEAT_WORDS_CTY);
};

export type RepeatWords = Awaited<ReturnType<typeof getRepeatWords>>;

export const getSentence = unstable_cache(
  async (id: Tables<'words'>['id']) => {
    const { data, error } = await supabase
      .from('words')
      .select('example_ro, example_en')
      .eq('id', id);
    if (error) throw error;
    if (!data) return null;

    return data[0];
  },
  undefined,
  { revalidate: parseInt(process.env.REVALIDATE_PERIOD_SEC ?? '3600') }
);

export type SentenceType = Awaited<ReturnType<typeof getSentence>>;

export const getSetInfo = cache(async (setName: string) => {
  const { data, error } = await supabase
    .from('sets_view')
    .select('id, unit_id, set, words_count')
    .eq('set', setName)
    .limit(1);
  if (error) throw error;

  return data[0];
});

export type SetInfo = Awaited<ReturnType<typeof getSetInfo>>;

export const getUnits = cache(async () => {
  const { data, error } = await supabase
    .from('units_view')
    .select('id, name, image');
  if (error) throw error;

  return data;
});

export type Units = Awaited<ReturnType<typeof getUnits>>;

export async function getUnitSets(unitId: Tables<'units_view'>['id']) {
  if (!unitId) throw new Error('Unit id was not provided to fetch sets');

  const { data, error } = await supabase
    .from('sets_view')
    .select('id, set, emoji, order, words_count')
    .eq('unit_id', unitId)
    .order('order');
  if (error) throw error;

  return data;
}

export const getWord = cache(async (word: string) => {
  const { data, error } = await supabase
    .from('words')
    .select(
      `id,
       en,
       ro,
       ro_plural,
       gender_ro,
       plural,
       img_name,
       audio_name,
       example_ro,
       example_en`
    )
    .eq('en', word)
    .limit(1);
  if (error) throw error;

  return data[0];
});

export type WordType = Awaited<ReturnType<typeof getWord>>;

export const getSetWords = cache(async (setName: string) => {
  const { data, error } = await supabase
    .from('words')
    .select(
      `${FIELDS},
       sets!inner(id, set)`
    )
    .eq('sets.set', setName);
  if (error) throw error;

  return data;
});

export type SetWords = Awaited<ReturnType<typeof getSetWords>>;
