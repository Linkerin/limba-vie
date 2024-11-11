import type { Metadata } from 'next';

import { getRepeatWords } from '@/app/_services/supabase/dbFetchers';
import PracticeSetView from '@/app/_components/_views/set/PracticeSetView/PracticeSetView';
import type { RepeatPageSearchParams } from '@/app/_lib/types';
import SetProvider from '@/app/_contexts/SetProvider';

export const metadata: Metadata = {
  title: 'Practice Set'
};

async function PracticePage({
  searchParams
}: {
  searchParams: RepeatPageSearchParams;
}) {
  const words = await getRepeatWords(searchParams);

  return (
    <SetProvider words={words}>
      <PracticeSetView setName="practice" />
    </SetProvider>
  );
}

export default PracticePage;
