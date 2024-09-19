export const AUDIO_FILE_FORMAT = 'aac';

export const CLOUDINARY_IMG_URL = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`;

export const GENDER_COLORS = Object.freeze({
  m: 'hsl(255, 58%, 40%)',
  n: 'hsl(43, 100%, 44%)',
  f: 'hsl(352, 60%, 47%)'
});

export const LOCAL_STORAGE_KEYS = Object.freeze({
  completedSets: 'lvCompletedSets',
  repeatWords: 'lvRepeatWords',
  sound: 'lvAudioAutoplay',
  userId: 'lvUserId',
  cookiesConsent: 'lvCookies'
});
export const REPEAT_WORDS_CTY = 20;

// report sending counter updates once in an hour
export const REPORT_SENDING_COOLDOWN_SEC = 3600;

export const REPORT_TYPES = [
  'incorrect_ro',
  'incorrect_en',
  'offensive',
  'image_audio',
  'answer',
  'other'
];

export const SUPABASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export const ARTICLES = Object.freeze({
  articles: {
    title: 'Indefinite and definite articles',
    description:
      'Grammar explanation of definite and indefinite articles usage in Romanian language',
    link: 'articles'
  },
  plurals: {
    title: 'Plural number of the noun',
    description:
      'Grammar explanation of the plural number of the noun formation in Romanian language',
    link: 'plurals'
  },
  personalPronouns: {
    title: 'Personal pronouns. Verbs "to be" and "to have".',
    description:
      'Grammar explanation of personal pronouns and their usage with the verbs "to be" and "to have" in Romanian language',
    link: 'personal-pronouns'
  }
});
