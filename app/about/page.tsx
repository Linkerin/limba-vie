import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

import styles from './page.module.css';

function AboutPage() {
  return (
    <div className={styles.about}>
      <address className={styles.address}>
        <p>
          If you have any questions or suggestions, please contact us at{' '}
          <Link
            aria-label="Contact e-mail address"
            href="mailto:limba@snipshot.dev"
          >
            limba@snipshot.dev
          </Link>
        </p>
        <p>
          Developed by{' '}
          <Link
            aria-label="To Alexei Gusev's GitHub profile"
            href="https://github.com/Linkerin"
            rel="noopener external"
            target="_blank"
          >
            Alexei Gusev <IconExternalLink />
          </Link>
        </p>
      </address>
      <section className={styles.credits}>
        <h1>Credits:</h1>
        <p>
          <Link
            href="https://freesound.org/people/LittleRobotSoundFactory/sounds/270404/"
            rel="noopener external"
            target="_blank"
          >
            Jingle_Achievement_00.wav
            <IconExternalLink />
          </Link>{' '}
          by{' '}
          <Link
            href="https://freesound.org/people/LittleRobotSoundFactory/"
            rel="noopener external"
            target="_blank"
          >
            LittleRobotSoundFactory <IconExternalLink />
          </Link>{' '}
          | License:{' '}
          <Link
            href="https://creativecommons.org/licenses/by/4.0/"
            rel="noopener external"
            target="_blank"
          >
            Attribution 4.0 <IconExternalLink />
          </Link>
        </p>
        <p>
          <Link
            href="https://www.freepik.com/free-vector/cute-bull-thumbs-up-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_35868793.html"
            rel="noopener external"
            target="_blank"
          >
            Image by catalyststuff <IconExternalLink />
          </Link>{' '}
          on Freepik
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
