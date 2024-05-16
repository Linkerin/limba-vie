'use client';

import { useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';

import ButtonLink from '@/app/_components/_ui/Button/ButtonLink/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './SetItemPopover.module.css';
import React from 'react';

interface SetItemPopoverProps {
  closeHandler: () => void;
  emoji: Tables<'sorted_sets'>['emoji'];
  set: Tables<'sets'>['set'];
}

function SetItemPopover({ closeHandler, emoji, set }: SetItemPopoverProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleOutClick = (e: MouseEvent | TouchEvent) => {
      if (e.target instanceof Element && modalRef.current?.contains(e.target))
        return;

      closeHandler();
    };

    document.addEventListener('mousedown', handleOutClick);

    return () => {
      document.removeEventListener('mousedown', handleOutClick);
    };
  }, [closeHandler]);

  return (
    <div className={styles.container}>
      <div ref={modalRef} className={styles.card}>
        <button aria-label="Close modal" onClick={closeHandler}>
          <IconX />
        </button>
        <p>
          {emoji} {capitalizeWord(set)}
        </p>
        <div className={styles.buttons}>
          <ButtonLink
            aria-label={`To ${capitalizeWord(set)} words set`}
            href={`/set/${encodeURIComponent(set)}`}
            prefetch
          >
            Repeat
          </ButtonLink>
          <ButtonLink
            aria-label={`To ${capitalizeWord(set)} words set practice`}
            href={`/set/check/${encodeURIComponent(set)}`}
            variant="secondary"
            prefetch
          >
            Practice
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default SetItemPopover;
