import type { Metadata } from 'next';

import OfflinePage from '@/app/_components/Pages/OfflinePage/OfflinePage';

export const metadata: Metadata = {
  title: 'Offline'
};

function Offline() {
  return <OfflinePage />;
}

export default Offline;
