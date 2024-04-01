'use client';

import { useRef, useState } from 'react';
import { Kalam } from 'next/font/google';
import Image from 'next/image';
import classNames from 'classnames';
import { IconBalloon, IconVolume } from '@tabler/icons-react';

import ActionBtn from '../ActionBtn/ActionBtn';
import { capitalizeWord } from '@/app/_lib/utils';

import styles from './WordCard.module.css';

const kalam = Kalam({
  subsets: ['latin-ext'],
  weight: ['400', '700']
});

type Gender = 'm' | 'f' | 'n' | null;

const supabaseStorageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

function getFullGender(genderAbbr: Gender) {
  if (!genderAbbr) return null;

  switch (genderAbbr) {
    case 'm':
      return 'masculin';

    case 'n':
      return 'neutru';

    case 'f':
      return 'feminin';

    default:
      return null;
  }
}

function getArticle(gender: Gender) {
  if (!gender) return null;

  switch (gender) {
    case 'm':
      return 'un';

    case 'n':
      return 'un';

    case 'f':
      return 'o';

    default:
      return null;
  }
}

function WordCard({ words }: { words: any[] }) {
  const [currWord, setCurrWord] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!audioRef.current) return;

    audioRef.current.play();
    console.log(audioRef.current.dataset.playing);
  };

  const nextWord = () => {
    setCurrWord(prevState => prevState + 1);
  };

  const actionClickHandler = (e: React.MouseEvent) => {
    nextWord();
  };

  return currWord < words.length ? (
    <section className={styles.section}>
      <p className={styles.counter}>
        {currWord + 1} / {words.length}
      </p>
      <div
        className={classNames(
          styles['img-container'],
          styles[words[currWord].gender_ro]
        )}
      >
        <Image
          alt={`${words[currWord].en} picture`}
          src={`${supabaseStorageUrl}/images/480/${words[currWord].img_name}.webp`}
          height={480}
          width={480}
          priority
        />
      </div>
      <div className={styles['word-container']}>
        <p className={kalam.className}>
          {getArticle(words[currWord].gender_ro)} {words[currWord].ro}
        </p>
        {words[currWord].audio_name?.length > 0 && (
          <>
            <IconVolume onClick={audioClickHandler} />
            <audio
              ref={audioRef}
              src={`${supabaseStorageUrl}/audio_ro/${words[currWord].audio_name}.mp3`}
            />
          </>
        )}
      </div>
      <p id={styles['gender']} className={styles[words[currWord].gender_ro]}>
        {getFullGender(words[currWord].gender_ro)}
      </p>
      <div id={styles['actions']}>
        <ActionBtn variant="repeat" onClick={actionClickHandler} />
        <ActionBtn variant="learned" onClick={actionClickHandler} />
      </div>
    </section>
  ) : (
    <section className={styles.finished}>
      <IconBalloon />
      <p>
        You have finished the{' '}
        <span>{capitalizeWord(words[0]['set_id'].set)}</span> set!
      </p>
      <a aria-label="To homepage" href="/">
        Continue
      </a>
    </section>
  );
}

export default WordCard;
