'use client';

import { useEffect } from 'react';

import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

function FinishedSound() {
  const isAllowed = useIsSoundAllowed();

  useEffect(() => {
    if (typeof navigator?.vibrate !== 'function' || !isAllowed) return;

    const timeoutId = setTimeout(() => {
      navigator.vibrate([300, 200, 500]);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAllowed]);

  return isAllowed ? (
    <audio src="/sounds/tadam.aac" preload="auto" autoPlay />
  ) : null;
}

export default FinishedSound;
