import { useEffect } from 'react';

import { CLOUDINARY_IMG_URL, SUPABASE_STORAGE_URL } from '../_lib/constants';
import type { WordScreenProps } from '../_components/WordScreen/WordScreen';

function useMediaLoad(current: number, words: WordScreenProps['words']) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (current >= words.length - 2) return;

    const load = (i: number) => {
      const img = new Image();
      img.src = `${CLOUDINARY_IMG_URL}/f_auto,q_75,w_480/v1/limba/${words[i].img_name}`;
      new Audio(`${SUPABASE_STORAGE_URL}/audio/ro/${words[i].audio_name}.mp3`);

      return;
    };

    if (current === 0) {
      load(current);
      load(current + 1);
      const img = new Image();
      img.src = '/taur.svg';
    }

    load(current + 2);
  }, [current, words]);

  return;
}

export default useMediaLoad;
