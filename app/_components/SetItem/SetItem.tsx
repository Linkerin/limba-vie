import { capitalizeWord } from '@/app/_lib/utils';

import styles from './SetItem.module.css';

function SetItem({ emoji, set }: { emoji: string; set: string }) {
  const capitalizedSet = capitalizeWord(set);

  return (
    <li className={styles.section}>
      <span>{emoji}</span>
      <a
        aria-label={`To ${capitalizedSet} words set`}
        href={`/set/${set}`}
        target="_self"
      >
        {capitalizedSet}
      </a>
    </li>
  );
}

export default SetItem;
