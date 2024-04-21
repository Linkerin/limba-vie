'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconBarbell, IconHome, IconUser } from '@tabler/icons-react';

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
    .slice(0, 20)
    .map(val => ['r', `${val}`]);

  const params = new URLSearchParams([...setParamArr, ...repeatParamArr]);
  const url = new URL('/set/lvrepeat', process.env.NEXT_PUBLIC_BASE_URL);
  url.search = params.toString();

  return !pathname.match(/\/set\/?.*/) && show ? (
    <footer className={styles.footer}>
      <nav>
        <ol>
          <li className={classNames({ [styles.active]: pathname === '/' })}>
            <Link aria-label="To main page with units list" href="/">
              <span>
                <IconHome />
              </span>
            </Link>
          </li>
          <li>
            <Link aria-label="To user profile" href="#">
              <span>
                <IconUser />
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
