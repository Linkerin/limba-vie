'use client';

import { createContext, useCallback, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '../_lib/constants';
import ssrLocalStorage from '../_services/SsrLocalStorage';

const autoplayKey = LOCAL_STORAGE_KEYS.sound;

type CurrentPlaying = HTMLAudioElement | null;
interface CurrPlayingContextValue {
  currentPlaying: CurrentPlaying;
  setCurrentPlaying: React.Dispatch<React.SetStateAction<CurrentPlaying>>;
}

export const CurrPlayingContext = createContext<CurrPlayingContextValue>({
  currentPlaying: null,
  setCurrentPlaying: () => {}
});
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

  const [currentPlaying, setCurrentPlaying] = useState<CurrentPlaying>(null);

  const toogleSoundMode = useCallback(() => {
    setAutoplay(prevState => {
      const autoplayPrefSet = ssrLocalStorage.setItem(
        autoplayKey,
        JSON.stringify(!prevState)
      );

      if (!autoplayPrefSet) return prevState;

      return !prevState;
    });
  }, []);

  return (
    <SoundContext.Provider value={autoplay}>
      <SoundToggleContext.Provider value={toogleSoundMode}>
        <CurrPlayingContext.Provider
          value={{ currentPlaying, setCurrentPlaying }}
        >
          {children}
        </CurrPlayingContext.Provider>
      </SoundToggleContext.Provider>
    </SoundContext.Provider>
  );
}
