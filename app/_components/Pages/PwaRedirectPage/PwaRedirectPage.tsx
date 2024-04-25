'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useRepeatBtn from '@/app/_hooks/useRepeatBtn';

function PwaRedirectPage() {
  const { url } = useRepeatBtn();
  const router = useRouter();

  useEffect(() => {
    router.push(url.href);
  }, [router, url.href]);

  return null;
}

export default PwaRedirectPage;
