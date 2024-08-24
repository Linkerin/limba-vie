import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import About from './RightButtons/About';
import logoImg from '@/public/logo.svg';

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
        <Image
          alt="Geometrical taur head image as Limba Vie logo"
          src={logoImg}
          priority
        />
      </Link>
      <div className={rightContainerStyles}>
        <MuteBtn />
        <About />
      </div>
    </header>
  );
}

export default Header;
