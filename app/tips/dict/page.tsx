import { cache } from 'react';
import { captureException } from '@sentry/nextjs';

import DictPage from '@/app/_components/Pages/DictPage/DictPage';
import supabase from '@/app/_lib/supabase';
import type { Tables } from '@/app/_lib/supabase.types';

const trimVerb = (
  word: Tables<'words'>['ro'],
  gender: Tables<'words'>['gender_ro']
) => {
  let result = word;
  if (!gender && word.slice(0, 2) === 'a ') {
    result = word.slice(2);
  }

  return result;
};

const getWords = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('id, en, ro, gender_ro, plural')
      .order('ro');
    if (error) throw error;

    const roCollator = new Intl.Collator('ro');

    const sortedList = data.sort((a, b) => {
      const lowerAWord = trimVerb(a.ro, a.gender_ro).toLowerCase();
      const lowerBWord = trimVerb(b.ro, b.gender_ro).toLowerCase();

      return roCollator.compare(lowerAWord, lowerBWord);
    });

    return sortedList;
  } catch (err) {
    console.error(err);
    captureException(err, { level: 'warning' });

    return [];
  }
});

async function Dict() {
  const words = await getWords();

  return <DictPage words={words} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);

export default Dict;
