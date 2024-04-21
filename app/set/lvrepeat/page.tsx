import { cache } from 'react';

import { REPEAT_WORDS_CTY } from '@/app/_lib/constants';
import { shuffleArr } from '@/app/_lib/utils';
import supabase from '@/app/_lib/supabase';
import { Tables } from '@/app/_lib/supabase.types';
import WordScreen from '@/app/_components/WordScreen/WordScreen';

const fields = `id,
                  en,
                  en_alternatives,
                  ro,
                  gender_ro,
                  plural,
                  img_name,
                  audio_name`;

type WordsArr = Omit<Tables<'words'>, 'set_id' | 'created_at' | 'updated_at'>[];

interface fetchSetParams {
  setId: Tables<'words'>['set_id'];
  ids: (string | undefined)[];
  words: WordsArr;
}
const fetchSet = async ({ setId, ids, words }: fetchSetParams) => {
  const { data, error } = await supabase
    .from('words')
    .select(fields)
    .eq('set_id', setId)
    .not('id', 'in', `(${ids.join(',')})`);
  if (error) throw error;

  return [...words, ...data];
};

const getWords = cache(async ({ set, r }: RepeatPageProps['searchParams']) => {
  let words: WordsArr = [];

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

    if (words.length >= REPEAT_WORDS_CTY) return words;
    if (!set || set.length <= 0) return words;

    if (!Array.isArray(set)) {
      words = await fetchSet({ setId: parseInt(set), ids, words });

      return words.slice(0, REPEAT_WORDS_CTY);
    }

    for (const setId of set) {
      if (words.length >= REPEAT_WORDS_CTY) {
        return words.slice(0, REPEAT_WORDS_CTY);
      }

      words = await fetchSet({ setId: parseInt(setId), ids, words });
    }

    return words.slice(0, REPEAT_WORDS_CTY);
  } catch (err) {
    throw err;
  }
});

interface RepeatPageProps {
  searchParams: {
    set: string | string[] | undefined;
    r: string | string[] | undefined;
  };
}

async function RepeatPage({ searchParams }: RepeatPageProps) {
  const words = await getWords(searchParams);

  return <WordScreen words={shuffleArr(words)} setName="practice" />;
}

export default RepeatPage;

export const dynamic = 'force-dynamic';
export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);
