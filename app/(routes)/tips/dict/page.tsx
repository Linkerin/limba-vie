import type { Metadata } from 'next';

import DictPage from '@/app/_components/Pages/TipsPage/DictPage/DictPage';
import { getDict } from '@/app/_services/dbFetchers';

export const metadata: Metadata = {
  title: 'Dictionary'
};

async function Dict() {
  const words = await getDict();

  return <DictPage words={words} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);

export default Dict;
