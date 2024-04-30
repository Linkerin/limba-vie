'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { IconBarbell, IconBook2, IconHome } from '@tabler/icons-react';

import { DeviceContext } from '@/app/_contexts/DeviceProvider';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

import styles from './NavBar.module.css';

function NavBar() {
  const pathname = usePathname();

  const { isApplePwa } = useContext(DeviceContext);
  const { show, url } = useRepeatBtn();

  return !pathname.match(/\/set\/?.*/) ? (
    <footer
      className={classNames(styles.footer, {
        [styles['apple-pwa']]: isApplePwa
      })}
    >
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
