import Link from 'next/link';
import {
  IconBrandInstagram,
  IconExternalLink,
  IconHeartFilled
} from '@tabler/icons-react';

import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.about}>
      <section id="intro" className={styles.intro}>
        <h1>
          Welcome to <span>Limba Vie</span>!
        </h1>
        <p>
          Unlock the beauty of the Romanian language with our flashcard app.
        </p>
        <p>
          Our primary goal is to make mastering Romanian words simple,
          effective, and fun. We hope our app will be the perfect complementary
          tool for your language learning journey.
        </p>
        <p>
          With <IconHeartFilled /> from Moldova 🇲🇩
        </p>
      </section>

      <section id="contacts" className={styles.contacts}>
        <h2>Contacts</h2>
        <Link
          href="https://instagram.com/limba_vie"
          rel="noopener external"
          target="_blank"
          prefetch={false}
        >
          <IconBrandInstagram />
        </Link>
        <address>
          <p>
            Have questions, suggestions, or need assistance?
            <br />
            Reach out to us at{' '}
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
      </section>

      <section id="credits" className={styles.credits}>
        <h2>Credits</h2>
        <p>
          We highly appreciate the creators of the open-source assets that
          helped us develop this app:
        </p>
        <ul>
          <li>
            <Link
              href="https://freesound.org/people/LittleRobotSoundFactory/sounds/270404/"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              Jingle_Achievement_00.wav
              <IconExternalLink />
            </Link>{' '}
            by{' '}
            <Link
              href="https://freesound.org/people/LittleRobotSoundFactory/"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              LittleRobotSoundFactory <IconExternalLink />
            </Link>{' '}
            | License:{' '}
            <Link
              href="https://creativecommons.org/licenses/by/4.0/"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              Attribution 4.0 <IconExternalLink />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.freepik.com/free-vector/cute-bull-thumbs-up-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_35868793.html"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              Image by catalyststuff <IconExternalLink />
            </Link>{' '}
            on Freepik
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
