import Skeleton from '@/app/_components/Skeleton/Skeleton';

import styles from './loading.module.css';

const btnSize = '8rem';
const size = 'min(30dvh, 480px)';

function Loading() {
  return (
    <section className={styles.section}>
      <Skeleton height={size} width={size} radius="sm" />
      <Skeleton height="4rem" width={size} />
      <div className={styles.actions}>
        <Skeleton height={btnSize} width={btnSize} />
        <Skeleton height={btnSize} width={btnSize} />
      </div>
    </section>
  );
}

export default Loading;
