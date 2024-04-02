import supabase from '@/app/_lib/supabase';

import WordCard from '@/app/_components/WordScreen/WordCard';

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

function shuffle(arr: any[]) {
  arr.reverse().forEach((_, index) => {
    const j = Math.floor(Math.random() * (index + 1));
    [arr[index], arr[j]] = [arr[j], arr[index]];
  });

  return arr;
}

async function SetPage({ params }: { params: { setName: string } }) {
  const words = await getWords(params.setName);
  const shuffledWords = shuffle(words);

  return <WordCard words={shuffledWords} />;
}

export default SetPage;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('sets').select('set');
  if (error) throw error;

  return data.map(set => ({
    setName: set.set
  }));
}
