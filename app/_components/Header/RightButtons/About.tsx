import { IconMessage2Question } from '@tabler/icons-react';

import ButtonLink from '../../_ui/Button/ButtonLink';

import styles from './RightButtons.styles';

function About() {
  return (
    <ButtonLink
      aria-label="To about page"
      href="/about"
      variant="base"
      css={styles}
    >
      <IconMessage2Question role="presentation" />
    </ButtonLink>
  );
}

export default About;
