import type { Metadata } from 'next';

import OfflineView from '@/app/_components/_views/offline/OfflineView';

export const metadata: Metadata = {
  title: 'Offline'
};

function OfflinePage() {
  return <OfflineView />;
}

export default OfflinePage;
