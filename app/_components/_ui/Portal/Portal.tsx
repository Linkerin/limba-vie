'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }: { children: React.ReactNode }) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    ref.current = document.querySelector('#modal');
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}

export default Portal;
