'use client';

import { useContext } from 'react';

import {
  CurrPlayingContext,
  SoundContext,
  SoundToggleContext
} from '../_contexts/SoundProvider';

export function useCurrentPlaying() {
  const current = useContext(CurrPlayingContext);

  return current;
}

export function useSoundToggle() {
  const toggleSound = useContext(SoundToggleContext);

  return toggleSound;
}

export function useIsSoundAllowed() {
  const isSoundAllowed = useContext(SoundContext);

  return isSoundAllowed;
}

function useSoundMode() {
  const isSoundAllowed = useContext(SoundContext);

  const toggleSound = useContext(SoundToggleContext);

  return { isSoundAllowed, toggleSound };
}

export default useSoundMode;
