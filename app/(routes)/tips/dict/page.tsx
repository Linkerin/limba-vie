import type { Metadata } from 'next';

import DictView from '@/app/_components/_views/tips/dict/DictView';
import { getDict } from '@/app/_services/supabase/dbFetchers';

export const metadata: Metadata = {
  title: 'Dictionary',
  description:
    'Access a comprehensive dictionary of Romanian words available in the Limba Vie app. Explore definitions, pronunciations, and examples to expand your vocabulary.'
};

async function DictPage() {
  const words = await getDict();

  return <DictView words={words} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_SEC);

export default DictPage;
