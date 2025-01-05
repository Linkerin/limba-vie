import type { Metadata } from 'next';

import { CANONICAL_URL } from '@/app/_lib/constants';
import { getRepeatWords } from '@/app/_services/supabase/dbFetchers';
import PracticeSetView from '@/app/_components/_views/set/PracticeSetView/PracticeSetView';
import type { RepeatPageSearchParams } from '@/app/_lib/types';
import SetProvider from '@/app/_contexts/SetProvider';

export const metadata: Metadata = {
  title: 'Practice Set',
  alternates: {
    canonical: `${CANONICAL_URL}/set/lvpractice`
  }
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
