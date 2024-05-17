import DictPage from '@/app/_components/Pages/TipsPage/DictPage/DictPage';
import { getDict } from '@/app/_services/dbFetchers';

async function Dict() {
  const words = await getDict();

  return <DictPage words={words} />;
}

export const revalidate = Number(process.env.REVALIDATE_PERIOD_MS);

export default Dict;
