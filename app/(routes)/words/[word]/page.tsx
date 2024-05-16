import { getWord } from '@/app/_services/dbFetchers';
import WordPage from '@/app/_components/Pages/WordPage/WordPage';
import supabase from '@/app/_lib/supabase';

async function Word({ params }: { params: { word: string } }) {
  const wordParam = decodeURIComponent(params.word);
  const word = await getWord(wordParam);

  return <WordPage word={word} wordParam={wordParam} />;
}

export default Word;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('words').select('en');
  if (error) throw error;

  return data.map(word => ({
    word: word.en
  }));
}
