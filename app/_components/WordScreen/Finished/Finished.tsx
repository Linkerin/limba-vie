import { IconBalloon } from '@tabler/icons-react';

import { capitalizeWord } from '@/app/_lib/utils';

import styles from './Finished.module.css';

function Finished({ setName }: { setName: string }) {
  return (
    <section className={styles.section}>
      <IconBalloon />
      <p className={styles.msg}>
        You have finished the <span>{capitalizeWord(setName)}</span> set!
      </p>
      <a className={styles.btn} aria-label="To homepage" href="/">
        Continue
      </a>
    </section>
  );
}

export default Finished;
