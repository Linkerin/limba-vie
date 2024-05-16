import type { Tables } from '@/app/_lib/supabase.types';

import styles from './SetItemEmoji.module.css';

function SetItemEmoji({ emoji }: { emoji: Tables<'sets'>['emoji'] }) {
  return <span className={styles.emoji}>{emoji}</span>;
}

export default SetItemEmoji;
