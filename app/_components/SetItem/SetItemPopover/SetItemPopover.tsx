'use client';

import ButtonLink from '@/app/_components/_ui/Button/ButtonLink/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils';
import Modal from '../../_ui/Modal/Modal';
import type { Tables } from '@/app/_lib/supabase.types';

import styles from './SetItemPopover.module.css';

interface SetItemPopoverProps {
  closeHandler: () => void;
  emoji: Tables<'sorted_sets'>['emoji'];
  set: Tables<'sets'>['set'];
}

function SetItemPopover({ closeHandler, emoji, set }: SetItemPopoverProps) {
  return (
    <Modal closeHandler={closeHandler}>
      <p className={styles.set}>
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
    </Modal>
  );
}

export default SetItemPopover;
