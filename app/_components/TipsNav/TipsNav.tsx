'use client';

import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import ListItemLink from '../_ui/ListItemLink/ListItemLink';

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
            prefetch
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
            prefetch
          >
            Dictionary
          </ListItemLink>
        </li>
      </ol>
    </nav>
  );
}

export default TipsNav;
