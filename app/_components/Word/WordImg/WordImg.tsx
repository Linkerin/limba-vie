/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconView360Arrow } from '@tabler/icons-react';
import { cx } from '@/styled-system/css';

import { getImageUrl } from '@/app/_lib/utils/utils';
import type { Tables } from '@/app/_services/supabase/supabase.types';

import {
  backStyles,
  cardStyles,
  containerStyles,
  flipIconStyles,
  loaderStyles,
  sideContentStyles,
  sideStyles
} from './WordImg.styles';

interface WordImgProps {
  gender: Tables<'words'>['gender_ro'];
  wordEn: Tables<'words'>['en'];
  imgName?: Tables<'words'>['img_name'];
}

function WordImg({ gender, wordEn, imgName = wordEn }: WordImgProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImage, setCurrentImage] = useState(imgName);

  if (imgName !== currentImage) {
    setIsFlipped(false);
    setCurrentImage(imgName);
  }

  const onLoadHandler = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const flipHandler: React.MouseEventHandler = useCallback(_ => {
    setIsFlipped(prevState => !prevState);
  }, []);

  const { src, srcSet } = useMemo(
    () => getImageUrl(currentImage),
    [currentImage]
  );

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <button
        aria-label={isFlipped ? 'Show image' : 'Show english translation'}
        className={containerStyles}
        onClick={flipHandler}
      >
        <div
          className={cardStyles}
          data-flipped={isFlipped}
          data-gender={gender}
        >
          <IconView360Arrow className={flipIconStyles} role="presentation" />
          <div className={sideStyles} aria-busy={!isLoaded}>
            <img
              ref={imgRef}
              className={sideContentStyles}
              alt={`${wordEn} picture`}
              src={src}
              srcSet={srcSet}
              fetchPriority="high"
              loading="eager"
              onLoad={onLoadHandler}
            />
            <div className={loaderStyles} data-loaded={isLoaded} />
          </div>
          <div className={cx(sideStyles, backStyles)}>
            <p className={sideContentStyles}>{wordEn}</p>
          </div>
        </div>
      </button>
    </>
  );
}

export default WordImg;
