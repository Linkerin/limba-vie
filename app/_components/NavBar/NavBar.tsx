'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconBarbell, IconBook2, IconHome } from '@tabler/icons-react';

import { REPEAT_WORDS_CTY } from '@/app/_lib/constants';
import { shuffleArr } from '@/app/_lib/utils';
import ssrLocalStorage from '@/app/_services/SsrLocalStorage';

import styles from './NavBar.module.css';
import classNames from 'classnames';

function showTrainButton() {
  const result = {
    show: false,
    completedSets: [] as number[],
    wordsForRepeat: [] as string[]
  };

  const completedSetsStr = ssrLocalStorage.getItem('lvCompletedSets');
  const repeatWordsStr = ssrLocalStorage.getItem('lvRepeatWords');
  if (!completedSetsStr && !repeatWordsStr) return result;

  let setsExist = false;
  let repeatWordsExist = false;

  if (completedSetsStr) {
    const completedSets = JSON.parse(completedSetsStr);

    if (completedSets.length === 0) return result;

    setsExist = true;
    result.completedSets = completedSets;
  }

  if (repeatWordsStr) {
    const repeatWords = JSON.parse(repeatWordsStr);
    const wordIds = Object.keys(repeatWords);

    if (wordIds.length > 0) {
      repeatWordsExist = true;
      result.wordsForRepeat = wordIds;
    }
  }

  if (setsExist || repeatWordsExist) {
    result.show = true;

    return result;
  }

  return result;
}

function NavBar() {
  const pathname = usePathname();
  const { show, completedSets, wordsForRepeat } = showTrainButton();

  const setParamArr = shuffleArr(completedSets)
    .slice(0, 5)
    .map(val => ['set', `${val}`]);
  const repeatParamArr = shuffleArr(wordsForRepeat)
    .slice(0, REPEAT_WORDS_CTY)
    .map(val => ['r', `${val}`]);

  const params = new URLSearchParams(
    [...repeatParamArr, ...setParamArr].slice(0, REPEAT_WORDS_CTY)
  );
  const url = new URL('/set/lvrepeat', process.env.NEXT_PUBLIC_BASE_URL);
  url.search = params.toString();

  return !pathname.match(/\/set\/?.*/) && show ? (
    <footer className={styles.footer}>
      <nav>
        <ol>
          <li className={classNames({ [styles.current]: pathname === '/' })}>
            <Link aria-label="To main page with units list" href="/">
              <span>
                <IconHome />
              </span>
            </Link>
          </li>
          <li>
            <Link aria-label="To grammar articles" href="/tips/grammar">
              <span>
                <IconBook2 />
              </span>
            </Link>
          </li>
          <li>
            <Link aria-label="To practice set" href={url.href}>
              <span>
                <IconBarbell />
              </span>
            </Link>
          </li>
        </ol>
      </nav>
    </footer>
  ) : null;
}

export default NavBar;
