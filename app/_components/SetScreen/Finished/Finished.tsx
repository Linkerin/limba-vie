'use client';

import Image from 'next/image';

import ButtonLink from '@/app/_components/_ui/Button/ButtonLink';
import { capitalizeWord } from '@/app/_lib/utils/utils';
import FinishedSound from './FinishedSound/FinishedSound';
import type { SetInfo } from '@/app/_services/supabase/dbFetchers';
import Stats from './Stats/Stats';
import type { Tables } from '@/app/_services/supabase/supabase.types';
import taurImg from '@/public/taur.svg';
import usePracticeStats from './usePracticeStats';
import useSaveSetCompletion from '@/app/_components/SetScreen/Finished/useSaveSetCompletion';

import {
  btnStyles,
  containerStyles,
  imgStyles,
  msgStyles,
  setNameStyles
} from './Finished.styles';

function getHomeUrl(setInfo?: SetInfo) {
  const url = setInfo?.unit_id ? `#unit-${setInfo?.unit_id}` : '/';

  const homeUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_URL);
  const params = new URLSearchParams();

  if (setInfo?.unit_id) {
    params.append('open-unit-id', setInfo.unit_id.toString());
  }
  homeUrl.search = params.toString();

  return homeUrl;
}

interface FinishedProps {
  checkPage?: boolean;
  setInfo?: SetInfo;
  setName?: Tables<'sets'>['set'];
}

function Finished({ checkPage, setInfo, setName }: FinishedProps) {
  const { timeTaken, score, mistakesCorrected } = usePracticeStats();

  useSaveSetCompletion({
    setId: setInfo?.id,
    wordsNum: setInfo?.words_count,
    checkPage,
    score,
    timeTaken
  });

  const homeUrl = getHomeUrl(setInfo);
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
        {checkPage && (
          <Stats
            mistakesCorrected={mistakesCorrected}
            timeTaken={timeTaken}
            score={score}
          />
        )}
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
