export const AUDIO_FILE_FORMAT = 'aac';

export const CLOUDINARY_IMG_URL = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`;

export const LOCAL_STORAGE_KEYS = Object.freeze({
  completedSets: 'lvCompletedSets',
  repeatWords: 'lvRepeatWords',
  sound: 'lvAudioAutoplay'
});
export const REPEAT_WORDS_CTY = 20;

export const SUPABASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export const ARTICLES = Object.freeze({
  articles: {
    title: 'Indefinite and definite articles',
    description:
      'Grammar explanation of definite and indefinite articles usage in Romanian language',
    link: 'articles'
  }
});
