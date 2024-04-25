'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconBarbell, IconBook2, IconHome } from '@tabler/icons-react';

import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

import styles from './NavBar.module.css';
import classNames from 'classnames';

function NavBar() {
  const pathname = usePathname();

  const { show, url } = useRepeatBtn();

  return !pathname.match(/\/set\/?.*/) ? (
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
          <li
            className={classNames({
              [styles.current]: pathname.includes('/tips/')
            })}
          >
            <Link aria-label="To grammar articles" href="/tips/grammar">
              <span>
                <IconBook2 />
              </span>
            </Link>
          </li>
          {show && (
            <li>
              <Link aria-label="To practice set" href={url.href}>
                <span>
                  <IconBarbell />
                </span>
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </footer>
  ) : null;
}

export default NavBar;
