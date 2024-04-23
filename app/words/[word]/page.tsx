import { cache } from 'react';

import Word from '@/app/_components/WordScreen/Word/Word';
import WordImg from '@/app/_components/WordScreen/WordImg/WordImg';
import supabase from '@/app/_lib/supabase';

import styles from './page.module.css';

const getWords = cache(async (word: string) => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select(
        `id,
         en,
         en_alternatives,
         ro,
         gender_ro,
         plural,
         img_name,
         audio_name`
      )
      .eq('en', word);
    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
});

async function WordPage({ params }: { params: { word: string } }) {
  const wordParam = decodeURIComponent(params.word);
  const wordArr = await getWords(wordParam);
  const word = wordArr.at(0);

  return (
    <section className={styles.section}>
      {word ? (
        <>
          <WordImg
            wordEn={word.en}
            gender={word.gender_ro}
            imgName={word.img_name}
          />
          <Word
            word={word.ro}
            plural={word.plural}
            gender={word.gender_ro}
            audioName={word.audio_name}
          />
        </>
      ) : (
        <p>
          Something went wrong and the word &apos;{wordParam}&apos; was not
          found
        </p>
      )}
    </section>
  );
}

export default WordPage;

export async function generateStaticParams() {
  const { data, error } = await supabase.from('words').select('en');
  if (error) throw error;

  return data.map(word => ({
    word: word.en
  }));
}
