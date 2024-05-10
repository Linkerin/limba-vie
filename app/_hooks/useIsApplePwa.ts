import { useEffect, useState } from 'react';

function useIsApplePwa() {
  const [isApplePwa, setIsApplePwa] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isPwa =
      'standalone' in window.navigator
        ? !!window.navigator.standalone &&
          window.navigator.userAgent.match(/iPhone|iPad/) !== null
        : false;

    setIsApplePwa(isPwa);
  }, []);

  return isApplePwa;
}

export default useIsApplePwa;
