import { useEffect } from 'react';

import { AUDIO_FILE_FORMAT, SUPABASE_STORAGE_URL } from '../_lib/constants';
import { getWordsImageUrl } from '../_lib/utils';
import type { WordScreenProps } from '../_components/WordScreen/WordScreen';

function useMediaLoad(current: number, words: WordScreenProps['words']) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (current >= words.length - 2) return;

    const load = (i: number) => {
      new Audio(
        `${SUPABASE_STORAGE_URL}/audio/ro/${words[i].audio_name}.${AUDIO_FILE_FORMAT}`
      );
      const img = new Image();
      img.src = getWordsImageUrl(words[i].img_name);

      return;
    };

    if (current === 0) {
      load(current + 1);
      const img = new Image();
      img.src = '/taur.svg';
    }

    load(current + 2);
  }, [current, words]);

  return;
}

export default useMediaLoad;
