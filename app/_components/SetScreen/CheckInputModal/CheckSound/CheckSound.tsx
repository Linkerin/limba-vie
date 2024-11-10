'use client';

import { useEffect } from 'react';

import { getAudioUrl } from '@/app/_lib/utils/utils';
import type { ResultStatus } from '@/app/_components/SetScreen/CheckInput/useFormHandlers';
import type { Tables } from '@/app/_services/supabase/supabase.types';
import { useIsSoundAllowed } from '@/app/_hooks/useSoundMode';

interface CheckSoundProps {
  status: ResultStatus;
  audioName?: Tables<'words'>['audio_name'];
}

function CheckSound({ status, audioName }: CheckSoundProps) {
  const isAllowed = useIsSoundAllowed();

  useEffect(() => {
    if (!isAllowed || status !== 'error' || !audioName) return;

    const audio = new Audio(getAudioUrl({ audioName }));
    audio.id = audioName;

    const timeoutId = setTimeout(async () => {
      try {
        await audio.play();
      } catch (err) {
        console.error(
          `The audio ${audio.id} play request was interrupted`,
          err
        );
      }
    }, 350);

    return () => {
      clearTimeout(timeoutId);
      audio.pause();
    };
  }, [audioName, isAllowed, status]);

  return status && isAllowed ? (
    <audio src={`/sounds/${status}-modal.aac`} preload="auto" autoPlay />
  ) : null;
}

export default CheckSound;
