import { useEffect } from 'react';

import { SUPABASE_STORAGE_URL } from '../_lib/constants';

function useMediaLoad(words: any[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    for (const word of words) {
      const img = new Image();
      img.src = `${SUPABASE_STORAGE_URL}/images/480/${word.img_name}.webp`;
      const audio = new Audio();
      audio.src = `${SUPABASE_STORAGE_URL}/audio_ro/${word.audio_name}.mp3`;
    }
  }, [words]);

  return;
}

export default useMediaLoad;
