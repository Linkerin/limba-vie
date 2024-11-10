import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Set'
};

import { getRepeatWords } from '@/app/_services/supabase/dbFetchers';
import PracticeSetPage from '@/app/_components/_pages/SetPage/PracticeSetPage/PracticeSetPage';
import type { RepeatPageSearchParams } from '@/app/_lib/types';

async function RepeatPage({
  searchParams
}: {
  searchParams: RepeatPageSearchParams;
}) {
  const words = await getRepeatWords(searchParams);

  return <PracticeSetPage words={words} setName="practice" />;
}

export default RepeatPage;
