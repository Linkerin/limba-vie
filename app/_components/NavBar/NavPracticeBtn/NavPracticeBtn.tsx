'use client';

import { IconBarbell } from '@tabler/icons-react';

import NavItem from '../NavItem/NavItem';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

function NavPracticeBtn() {
  const { show, url } = useRepeatBtn();

  return show ? (
    <NavItem ariaLabel="To practice set" href={url.href} prefetch>
      <IconBarbell />
    </NavItem>
  ) : null;
}

export default NavPracticeBtn;
