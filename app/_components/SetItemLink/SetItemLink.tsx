'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IconCheck } from '@tabler/icons-react';

import ButtonLink from '../_ui/Button/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils';
import type { PopoverProps } from '../_ui/Popover/Popover';
import RingSpinner from '../_ui/RingSpinner/RingSpinner';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';
import type { Tables } from '@/app/_lib/supabase.types';

import {
  completedIconStyles,
  contentStyles,
  emojiStyles,
  popoverHeadingStyles,
  popoverSpinnerStyles,
  setStyles
} from './SetItemLink.styles';

const Popover = dynamic(() => import('../_ui/Popover/Popover'), {
  loading: () => <RingSpinner css={popoverSpinnerStyles} />
});

function isSetCompleted(id: number | null) {
  if (typeof window === 'undefined') return;
  if (id === null) return false;

  const completedSets = ssrLocalStorage.getItem('lvCompletedSets');
  if (!completedSets) return false;

  const completedSetsArr = JSON.parse(completedSets);
  if (completedSetsArr.includes(id)) return true;

  return false;
}

interface SetItemLinkProps {
  id: Tables<'sets_view'>['id'];
  emoji: Tables<'sets_view'>['emoji'];
  set: Tables<'sets_view'>['set'];
  wordsNum: Tables<'sets_view'>['words_count'];
}

function SetItemLink({ id, emoji, set, wordsNum }: SetItemLinkProps) {
  const isCompleted = useMemo(() => isSetCompleted(id), [id]);
  const contentText = `${wordsNum} word${wordsNum === 1 ? '' : 's'}`;
  const setLink = set ? `/set/${encodeURIComponent(set)}` : '#';
  const setAriaLabel = `To '${set}' words set`;

  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const [popoverX, setPopoverX] = useState<PopoverProps['positionX']>('left');
  const [popoverY, setPopoverY] = useState<PopoverProps['positionY']>('bottom');

  const liRef = useRef<HTMLLIElement>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();

      const center = {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2
      };

      if (e.clientX > center.width) {
        setPopoverX('right');
      } else {
        setPopoverX('left');
      }

      if (e.clientY > center.height) {
        setPopoverY('top');
      } else {
        setPopoverY('bottom');
      }

      setIsPopoverOpened(prevState => !prevState);
    },
    []
  );

  const handleOutClick = (e: MouseEvent) => {
    if (e.target instanceof Element && liRef.current?.contains(e.target))
      return;

    setIsPopoverOpened(false);
  };

  useEffect(() => {
    if (isPopoverOpened) {
      document.addEventListener('mousedown', handleOutClick);
    } else {
      document.removeEventListener('mousedown', handleOutClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutClick);
    };
  }, [isPopoverOpened]);

  return (
    <li ref={liRef} className={setStyles} data-completed={isCompleted}>
      {isCompleted ? (
        <button className={contentStyles} onClick={handleClick}>
          <span className={emojiStyles}>{emoji}</span>
          {contentText}
          <span className={completedIconStyles}>
            <IconCheck />
          </span>
        </button>
      ) : (
        <>
          <Link
            className={contentStyles}
            aria-label={setAriaLabel}
            href={setLink}
            target="_self"
          >
            <span className={emojiStyles}>{emoji}</span>
            {contentText}
          </Link>
        </>
      )}
      {isPopoverOpened && (
        <Popover positionX={popoverX} positionY={popoverY}>
          {set && (
            <h3 className={popoverHeadingStyles}>{capitalizeWord(set)}</h3>
          )}
          <ButtonLink
            aria-label={setAriaLabel}
            href={setLink}
            target="_self"
            variant="primary"
          >
            Repeat
          </ButtonLink>
          <ButtonLink
            aria-label={`${setAriaLabel} practice`}
            href={set ? `/set/check/${encodeURIComponent(set)}` : '#'}
            variant="success"
          >
            Practice
          </ButtonLink>
        </Popover>
      )}
    </li>
  );
}

export default SetItemLink;
