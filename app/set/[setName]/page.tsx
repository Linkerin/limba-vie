import supabase from '@/app/_lib/supabase';

import { shuffleArr } from '@/app/_lib/utils';
import WordScreen from '@/app/_components/WordScreen/WordScreen';

async function getWords(setName: string) {
  try {
    const { data, error } = await supabase
      .from('words')
      .select(
        `en,
         en_alternatives,
         ro,
         gender_ro,
         img_name,
         audio_name,
         set_id!inner (id, set)`
      )
      .eq('set_id.set', setName);
    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
}

async function SetPage({ params }: { params: { setName: string } }) {
  const words = await getWords(params.setName);
  const shuffledWords = shuffleArr(words);

  return <WordScreen words={shuffledWords} />;
}

export default SetPage;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('sets').select('set');
  if (error) throw error;

  return data.map(set => ({
    setName: set.set
  }));
}

export const dynamic = 'force-dynamic';
