import FlagMd from '../FlagMd/FlagMd';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <a aria-label="To homepage. LingoVie logo" href="/">
        <span id={styles.limba}>Limba</span>
        <span>Vie</span>
      </a>
      <FlagMd />
    </header>
  );
}

export default Header;
