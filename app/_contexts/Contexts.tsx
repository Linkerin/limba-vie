import { headers } from 'next/headers';

import DeviceProvider from './DeviceProvider';
import SoundProvider from './SoundProvider';

function Contexts({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const device = {
    type: headersList.get('x-device-type'),
    model: headersList.get('x-device-model')
  };

  return (
    <DeviceProvider device={device}>
      <SoundProvider>{children}</SoundProvider>
    </DeviceProvider>
  );
}

export default Contexts;
