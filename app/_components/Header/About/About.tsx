import Link from 'next/link';

import styles from './About.module.css';

function About() {
  return (
    <Link className={styles.btn} aria-label="To about page" href={'/about'}>
      i
    </Link>
  );
}

export default About;
