'use client';

import Image from 'next/image';

import ButtonLink from '../../_ui/Button/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils';
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
  setInfo?: SetInfo;
  setName?: Tables<'sets'>['set'];
}

function Finished({ setInfo, setName }: FinishedProps) {
  useSaveSetCompletion(setInfo?.id);

  const homePath = setInfo?.prev_set_id ? `/#set-${setInfo.prev_set_id}` : '/';
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
        href={homePath}
        prefetch
      >
        Continue
      </ButtonLink>
    </>
  );
}

export default Finished;
