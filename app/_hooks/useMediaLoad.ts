'use client';

import { useEffect } from 'react';

import { getAudioUrl, getImageUrl } from '../_lib/utils/utils';
import type { SetPageProps } from '../_components/_views/set/SetView';

function useMediaLoad(current: number, words: SetPageProps['words']) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (current >= words.length - 2) return;

    const load = (i: number) => {
      new Audio(getAudioUrl({ audioName: words[i].audio_name }));

      const { src, srcSet } = getImageUrl(words[i].img_name);
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.srcset = srcSet;

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
