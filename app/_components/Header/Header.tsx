import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import About from './RightButtons/About';
import DesktopNav from './DesktopNav/DesktopNav';
import flowerLogoImg from '@/public/images/flower_logo.svg';
import logoImg from '@/public/logo.svg';

import {
  headerStyles,
  logoContainerStyles,
  logoStyles,
  rightContainerStyles
} from './Header.styles';

const MuteBtn = dynamic(() => import('./RightButtons/MuteBtn'), { ssr: false });

function Header() {
  return (
    <header className={headerStyles}>
      <div className={logoContainerStyles}>
        <Link
          aria-label="To homepage. LimbaVie logo"
          href="/"
          className={logoStyles}
        >
          <Image
            alt="Geometrical taur head image as Limba Vie logo"
            src={
              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PREVIEW'
                ? flowerLogoImg
                : logoImg
            }
            priority
          />
        </Link>
        <DesktopNav />
      </div>
      <div className={rightContainerStyles}>
        <MuteBtn />
        <About />
      </div>
    </header>
  );
}

export default Header;
