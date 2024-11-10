import type { Metadata } from 'next';

import { getRepeatWords } from '@/app/_services/supabase/dbFetchers';
import PracticeSetView from '@/app/_components/_views/set/PracticeSetView/PracticeSetView';
import type { RepeatPageSearchParams } from '@/app/_lib/types';

export const metadata: Metadata = {
  title: 'Practice Set'
};

async function RepeatPage({
  searchParams
}: {
  searchParams: RepeatPageSearchParams;
}) {
  const words = await getRepeatWords(searchParams);

  return <PracticeSetView words={words} setName="practice" />;
}

export default RepeatPage;
