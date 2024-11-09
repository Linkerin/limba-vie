import { useEffect, useState } from 'react';

import { getCompletedSet } from '@/app/_services/dexie/queries/completedSets';
import { getLearnedWord } from '@/app/_services/dexie/queries/learnedWords';
import type { Tables } from '@/app/_lib/supabase.types';

interface UseISWordLearnedParams {
  setId?: Tables<'words'>['set_id'];
  wordId?: Tables<'words'>['id'];
}

function useIsWordLearned({ setId, wordId }: UseISWordLearnedParams) {
  const [isLearned, setIsLearned] = useState(false);

  useEffect(() => {
    const checkIsLearned = async () => {
      if (wordId) {
        const word = await getLearnedWord(wordId);

        if (word) {
          setIsLearned(true);
          return;
        }
      }

      if (setId) {
        const set = await getCompletedSet(setId);

        // condition for the old completed sets logic when words were not recorded
        if (set && set.wordsNum === -1) {
          setIsLearned(true);
          return;
        }
      }
    };

    checkIsLearned();
  }, [setId, wordId]);

  return isLearned;
}

export default useIsWordLearned;
