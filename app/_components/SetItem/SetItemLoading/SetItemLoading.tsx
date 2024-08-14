import Skeleton from '@/app/_components/_ui/Skeleton/SkeletonOld';

import styles from './SetItemLoading.module.css';

function SetItemLoading() {
  return <Skeleton className={styles.skeleton} />;
}

export default SetItemLoading;
