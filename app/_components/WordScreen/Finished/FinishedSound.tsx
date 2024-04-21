'use client';

import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

function FinishedSound() {
  const isAllowed = useIsSoundAllowed();

  return isAllowed ? (
    <audio src="/sounds/tadam.aac" preload="auto" autoPlay />
  ) : null;
}

export default FinishedSound;
