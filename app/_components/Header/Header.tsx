import dynamic from 'next/dynamic';
import Link from 'next/link';

import About from './RightButtons/About';

import {
  headerStyles,
  logoStyles,
  rightContainerStyles
} from './Header.styles';

const MuteBtn = dynamic(() => import('./RightButtons/MuteBtn'), { ssr: false });

function Header() {
  return (
    <header className={headerStyles}>
      <Link
        aria-label="To homepage. LimbaVie logo"
        href="/"
        className={logoStyles}
        prefetch={false}
      >
        <span>Limba</span>
        <span>Vie</span>
      </Link>
      <div className={rightContainerStyles}>
        <MuteBtn />
        <About />
      </div>
    </header>
  );
}

export default Header;
