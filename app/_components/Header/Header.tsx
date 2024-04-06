import Link from 'next/link';

import FlagMd from '../FlagMd/FlagMd';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link aria-label="To homepage. LingoVie logo" href="/">
        <span id={styles.limba}>Limba</span>
        <span>Vie</span>
      </Link>
      <FlagMd />
    </header>
  );
}

export default Header;
