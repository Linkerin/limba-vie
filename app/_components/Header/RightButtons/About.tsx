import classNames from 'classnames';

import ButtonLink from '../../Button/ButtonLink';

import styles from './RightButtons.module.css';

function About() {
  return (
    <ButtonLink
      aria-label="To about page"
      href="/about"
      className={classNames(styles.btn, styles.info)}
      prefetch={false}
    >
      i
    </ButtonLink>
  );
}

export default About;
