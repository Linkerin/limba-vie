'use client';

import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

function CheckSound({ status }: { status: 'success' | 'error' }) {
  const isAllowed = useIsSoundAllowed();

  return isAllowed ? (
    <audio src={`/sounds/${status}-modal.aac`} preload="auto" autoPlay />
  ) : null;
}

export default CheckSound;
