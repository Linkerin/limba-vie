import ButtonLink from '../../Button/ButtonLink';

import styles from './RightButtons.module.css';

function About() {
  return (
    <ButtonLink aria-label="To about page" href="/about" className={styles.btn}>
      i
    </ButtonLink>
  );
}

export default About;
