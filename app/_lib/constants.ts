/**
 * Main audio format inside the app
 */
export const AUDIO_FILE_FORMAT = 'aac' as const;

export const CLOUDINARY_IMG_URL = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`;

export const DAY_IN_MS = 24 * 60 * 60 * 1000;

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

export const OBLIGATORY_REVIEW = Object.freeze({
  MISTAKES: 18,
  PERIOD_WO_REVIEW: DAY_IN_MS * 3
});

export const REPEAT_WORDS_CTY = 15 as const;

/**
 * User reports sending counter updates once in an hour
 */
export const REPORT_SENDING_COOLDOWN_SEC = 3600;

export const REPORT_TYPES = [
  'incorrect_ro',
  'incorrect_en',
  'offensive',
  'image_audio',
  'answer',
  'other'
] as const;

export const SUPABASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export const WORD_LEVELS = [0, 1, 2, 3, 4] as const;
type WordReviewPeriodObj = {
  [K in (typeof WORD_LEVELS)[number]]: number;
};
/**
 * Review period for words based on word level as a key
 */
export const WORD_REVIEW_PERIOD_MS: WordReviewPeriodObj = {
  0: DAY_IN_MS / 48, // after 30 mins
  1: DAY_IN_MS,
  2: DAY_IN_MS * 3,
  3: DAY_IN_MS * 5,
  4: DAY_IN_MS * 21
} as const;

/**
 * Grammar articles metadata
 */
export const ARTICLES = Object.freeze({
  articles: {
    title: 'Indefinite and definite articles',
    description:
      'Grammar explanation of definite and indefinite articles usage in Romanian language',
    link: 'articles'
  },
  articlesUsage: {
    title: 'Articles usage',
    description:
      'Grammar explanation of the usage of definite and indefinite articles in Romanian language',
    link: 'articles-usage'
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
