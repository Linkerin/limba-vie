import { IconMessage2Question } from '@tabler/icons-react';

import ButtonLink from '../../_ui/Button/ButtonLink/ButtonLink';

import styles from './RightButtons.module.css';

function About() {
  return (
    <ButtonLink
      aria-label="To about page"
      href="/about"
      className={styles.btn}
      variant="base"
    >
      <IconMessage2Question />
    </ButtonLink>
  );
}

export default About;
