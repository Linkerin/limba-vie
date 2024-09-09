'use client';

import { useEffect } from 'react';

import { getAudioUrl, getImageUrl } from '../_lib/utils';
import type { SetPageProps } from '../_components/_pages/SetPage/SetPage';

function useMediaLoad(current: number, words: SetPageProps['words']) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (current >= words.length - 2) return;

    const load = (i: number) => {
      new Audio(getAudioUrl({ audioName: words[i].audio_name }));
      const img = new Image();
      img.src = getImageUrl(words[i].img_name);

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
