'use client';

import { useMemo } from 'react';
import Image from 'next/image';

import ButtonLink from '../../_ui/Button/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils/utils';
import FinishedSound from './FinishedSound/FinishedSound';
import type { Tables } from '@/app/_lib/supabase.types';
import taurImg from '@/public/taur.svg';
import type { SetInfo } from '@/app/_services/dbFetchers';
import useSaveSetCompletion from '@/app/_hooks/useSaveSetCompletion';

import {
  btnStyles,
  containerStyles,
  imgStyles,
  msgStyles,
  setNameStyles
} from './Finished.styles';

interface FinishedProps {
  checkPage?: boolean;
  prevUnitId?: number | null;
  setInfo?: SetInfo;
  setName?: Tables<'sets'>['set'];
}

function Finished({ checkPage, prevUnitId, setInfo, setName }: FinishedProps) {
  useSaveSetCompletion({
    setId: setInfo?.id,
    wordsNum: setInfo?.words_count,
    checkPage
  });

  const url = useMemo(() => {
    if (!prevUnitId && !setInfo?.unit_id) return '/';

    const url = `#unit-${prevUnitId ? prevUnitId : setInfo?.unit_id}`;

    return url;
  }, [prevUnitId, setInfo?.unit_id]);

  const homeUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_URL);
  const params = new URLSearchParams();

  if (setInfo?.unit_id) {
    params.append('open-unit-id', setInfo.unit_id.toString());
  }
  homeUrl.search = params.toString();

  const set = setName ?? setInfo?.set ?? '';

  return (
    <>
      <div className={containerStyles}>
        <Image
          className={imgStyles}
          alt="Bourel mascot image congratilating with set completon"
          src={taurImg}
          priority
        />
        <p className={msgStyles}>
          You have finished the{' '}
          <span className={setNameStyles}>{capitalizeWord(set)}</span> set!
        </p>
      </div>
      <FinishedSound />
      <ButtonLink
        css={btnStyles}
        aria-label="To homepage"
        href={homeUrl.href}
        prefetch
      >
        Continue
      </ButtonLink>
    </>
  );
}

export default Finished;
