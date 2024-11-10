'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Loader from '@/app/_components/_ui/Loader/Loader';
import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

function PwaRedirectView() {
  const { url } = useRepeatBtn();
  const router = useRouter();

  useEffect(() => {
    router.push(url.href);
  }, [router, url.href]);

  return <Loader />;
}

export default PwaRedirectView;
