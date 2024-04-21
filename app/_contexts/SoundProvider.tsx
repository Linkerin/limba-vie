'use client';

import { createContext, useCallback, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '../_lib/constants';
import ssrLocalStorage from '../_services/SsrLocalStorage';

const autoplayKey = LOCAL_STORAGE_KEYS.sound;

export const SoundContext = createContext(
  !(ssrLocalStorage.getItem(autoplayKey) === 'false')
);
export const SoundToggleContext = createContext(() => {});

export default function SoundProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [autoplay, setAutoplay] = useState(
    !(ssrLocalStorage.getItem(autoplayKey) === 'false')
  );

  const toogleSoundMode = useCallback(() => {
    try {
      setAutoplay(prevState => {
        const autoplayPrefSet = ssrLocalStorage.setItem(
          autoplayKey,
          JSON.stringify(!prevState)
        );

        if (!autoplayPrefSet) return prevState;

        return !prevState;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <SoundContext.Provider value={autoplay}>
      <SoundToggleContext.Provider value={toogleSoundMode}>
        {children}
      </SoundToggleContext.Provider>
    </SoundContext.Provider>
  );
}
