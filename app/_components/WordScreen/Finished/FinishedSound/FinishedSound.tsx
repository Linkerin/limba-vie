'use client';

import { useEffect } from 'react';

import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

function FinishedSound() {
  const isAllowed = useIsSoundAllowed();
  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const timeoutId = setTimeout(() => {
      navigator.vibrate(300);
    }, 400);

    const timeoutIdSecond = setTimeout(() => {
      navigator.vibrate(500);
    }, 900);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutIdSecond);
    };
  }, []);

  return isAllowed ? (
    <audio src="/sounds/tadam.aac" preload="auto" autoPlay />
  ) : null;
}

export default FinishedSound;
