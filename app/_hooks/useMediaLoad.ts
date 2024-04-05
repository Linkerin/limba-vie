import { useEffect } from 'react';

import { SUPABASE_STORAGE_URL } from '../_lib/constants';

function useMediaLoad(current: number, words: any[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (current >= words.length - 2) return;

    const load = (i: number) => {
      const img = new Image();
      img.src = `${SUPABASE_STORAGE_URL}/images/480/${words[i].img_name}.webp`;
      const audio = new Audio();
      audio.src = `${SUPABASE_STORAGE_URL}/audio_ro/${words[i].audio_name}.mp3`;

      return;
    };

    if (current === 0) {
      load(current + 1);
    }

    load(current + 2);
  }, [current, words]);

  return;
}

export default useMediaLoad;
