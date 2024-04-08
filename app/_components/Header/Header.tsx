import dynamic from 'next/dynamic';
import Link from 'next/link';

import FlagMd from '../FlagMd/FlagMd';

import styles from './Header.module.css';

const TrainBtn = dynamic(() => import('./TrainBtn/TrainBtn'), { ssr: false });

function Header() {
  return (
    <header className={styles.header}>
      <Link aria-label="To homepage. LingoVie logo" href="/">
        <span id={styles.limba}>Limba</span>
        <span>Vie</span>
      </Link>
      <div className={styles['right-container']}>
        <TrainBtn />
        <FlagMd />
      </div>
    </header>
  );
}

export default Header;
