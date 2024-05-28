import type { Metadata } from 'next';

import TipsPage from '@/app/_components/Pages/TipsPage/TipsPage';

export const metadata: Metadata = {
  title: 'Grammar'
};

async function Tips() {
  return <TipsPage />;
}

export default Tips;
