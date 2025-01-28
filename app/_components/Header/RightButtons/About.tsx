import { IconMessage2Question } from '@tabler/icons-react';
import { css } from '@/styled-system/css';

import ButtonLink from '../../_ui/Button/ButtonLink';

import styles from './RightButtons.styles';

const hideStyles = css.raw({
  hideFrom: 'xl'
});

function About() {
  return (
    <ButtonLink
      aria-label="To about page"
      href="/about"
      variant="base"
      css={css.raw({ ...styles, ...hideStyles })}
    >
      <IconMessage2Question role="presentation" />
    </ButtonLink>
  );
}

export default About;
