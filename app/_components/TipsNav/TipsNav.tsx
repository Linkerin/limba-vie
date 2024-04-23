'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import ListItemLink from '../ListItemLink/ListItemLink';

import styles from './TipsNav.module.css';

function TipsNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ol className={styles.container}>
        <li>
          <ListItemLink
            className={classNames(styles.item, {
              [styles.current]: pathname.includes('/tips/grammar')
            })}
            aria-label="To grammar articles"
            href="/tips/grammar"
          >
            Grammar
          </ListItemLink>
        </li>
        <li>
          <ListItemLink
            className={classNames(styles.item, {
              [styles.current]: pathname.includes('/tips/dict')
            })}
            aria-label="To Romanian dictonary list"
            href="/tips/dict"
          >
            Dictionary
          </ListItemLink>
        </li>
      </ol>
    </nav>
  );
}

export default TipsNav;