'use client';

import { createContext, useEffect, useState } from 'react';

interface DeviceProviderProps {
  children: React.ReactNode;
  device: {
    model: string | null;
    type: string | null;
  };
}

export const DeviceContext = createContext({ isApplePwa: false });

export default function DeviceProvider({
  children,
  device
}: DeviceProviderProps) {
  const [isApplePwa, setIsApplePwa] = useState(
    device.model === null ? false : ['iPhone', 'iPad'].includes(device?.model)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isPwa =
      'standalone' in window.navigator
        ? !!window.navigator.standalone &&
          window.navigator.userAgent.match(/iPhone|iPad/) !== null
        : false;

    setIsApplePwa(isPwa);
  }, []);

  return (
    <DeviceContext.Provider value={{ isApplePwa }}>
      {children}
    </DeviceContext.Provider>
  );
}
