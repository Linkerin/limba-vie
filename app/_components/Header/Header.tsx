import dynamic from 'next/dynamic';
import Link from 'next/link';

import About from './RightButtons/About';
import FlagMd from './FlagMd/FlagMd';

import styles from './Header.module.css';

const MuteBtn = dynamic(() => import('./RightButtons/MuteBtn'), { ssr: false });

function Header() {
  return (
    <header className={styles.header}>
      <Link aria-label="To homepage. LimbaVie logo" href="/" prefetch>
        <span id={styles.limba}>Limba</span>
        <span>Vie</span>
      </Link>
      <div className={styles['right-container']}>
        <MuteBtn />
        <About />
        <FlagMd />
      </div>
    </header>
  );
}

export default Header;
