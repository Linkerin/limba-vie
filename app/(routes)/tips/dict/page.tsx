import type { Metadata } from 'next';

import DictPage from '@/app/_components/_pages/TipsPage/DictPage/DictPage';
import { getDict } from '@/app/_services/dbFetchers';

export const metadata: Metadata = {
  title: 'Dictionary',
  description:
    'Access a comprehensive dictionary of Romanian words available in the Limba Vie app. Explore definitions, pronunciations, and examples to expand your vocabulary.'
};

async function Dict() {
  const words = await getDict();

  return <DictPage words={words} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);

export default Dict;
