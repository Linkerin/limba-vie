import type { Metadata } from 'next';

import OfflinePage from '@/app/_components/_pages/OfflinePage/OfflinePage';

export const metadata: Metadata = {
  title: 'Offline'
};

function Offline() {
  return <OfflinePage />;
}

export default Offline;
