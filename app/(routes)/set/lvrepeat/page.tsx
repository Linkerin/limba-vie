import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Set'
};

import { getRepeatWords } from '@/app/_services/dbFetchers';
import SetPage from '@/app/_components/_pages/SetPage/SetPage';
import type { RepeatPageSearchParams } from '@/app/_lib/types';

async function RepeatPage({
  searchParams
}: {
  searchParams: RepeatPageSearchParams;
}) {
  const words = await getRepeatWords(searchParams);

  return <SetPage words={words} setName="practice" checkPage />;
}

export default RepeatPage;
