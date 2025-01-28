'use client';

import { usePathname } from 'next/navigation';
import { IconBarbell } from '@tabler/icons-react';

import ButtonLink from '../_ui/Button/ButtonLink';
import NavPracticeMsg from '@/app/_components/NavPracticeMsg/NavPracticeMsg';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

import { styles } from './PracticeFloatingButton.styles';

function PracticeFloatingButton() {
  const { show, url } = useRepeatBtn();
  const pathname = usePathname();

  return show && pathname === '/' ? (
    <ButtonLink
      css={styles}
      href={url.href}
      aria-label="To practice set"
      variant="success"
    >
      <NavPracticeMsg />
      <IconBarbell /> Practice
    </ButtonLink>
  ) : null;
}
export default PracticeFloatingButton;
