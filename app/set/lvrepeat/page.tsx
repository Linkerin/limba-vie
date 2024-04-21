import { cache } from 'react';

import { shuffleArr } from '@/app/_lib/utils';
import supabase from '@/app/_lib/supabase';
import { Tables } from '@/app/_lib/supabase.types';
import WordScreen from '@/app/_components/WordScreen/WordScreen';

interface RepeatPageProps {
  searchParams: {
    set: string | string[] | undefined;
    r: string | string[] | undefined;
  };
}

const getWords = cache(async ({ set, r }: RepeatPageProps['searchParams']) => {
  const fields = `id,
                  en,
                  en_alternatives,
                  ro,
                  gender_ro,
                  plural,
                  img_name,
                  audio_name`;

  let words: Omit<Tables<'words'>, 'set_id' | 'created_at' | 'updated_at'>[] =
    [];

  try {
    const ids = Array.isArray(r) ? r : [r];
    if (r && r.length > 0) {
      const { data, error } = await supabase
        .from('words')
        .select(fields)
        .in('id', ids);
      if (error) throw error;

      words = data;
    }

    if (words.length >= 20) return words;
    if (!set || set.length <= 0) return words;

    if (!Array.isArray(set)) {
      const { data, error } = await supabase
        .from('words')
        .select(fields)
        .eq('set_id', set)
        .not('id', 'in', `(${ids.join(',')})`);
      if (error) throw error;

      words = [...words, ...data];

      return words.slice(0, 20);
    }

    for (const setId of set) {
      if (words.length >= 20) return words.slice(0, 20);

      const { data, error } = await supabase
        .from('words')
        .select(fields)
        .eq('set_id', setId)
        .not('id', 'in', `(${ids.join(',')})`);
      if (error) throw error;

      words = [...words, ...data];
    }

    return words.slice(0, 20);
  } catch (err) {
    throw err;
  }
});

async function RepeatPage({ searchParams }: RepeatPageProps) {
  const words = await getWords(searchParams);

  return <WordScreen words={shuffleArr(words)} setName="practice" />;
}

export default RepeatPage;

export const dynamic = 'force-dynamic';
export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
