import { IconCheck } from '@tabler/icons-react';

import styles from './SetCompletedIcon.module.css';

function SetCompetedIcon() {
  return (
    <span className={styles['completed-icon']}>
      <IconCheck />
    </span>
  );
}

export default SetCompetedIcon;
