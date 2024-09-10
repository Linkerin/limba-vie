import Link from 'next/link';
import {
  IconBrandInstagram,
  IconExternalLink,
  IconHeartFilled
} from '@tabler/icons-react';

import DeleteAllData from './ProgressActions/DeleteAllData/DeleteAllData';
import ExportProgress from './ProgressActions/ExportProgress/ExportProgress';
import ImportProgress from './ProgressActions/ImportProgress/ImportProgress';

import {
  addressStyles,
  containerStyles,
  creditsListStyles,
  hrStyles,
  instagramIconStyles,
  introStyles
} from './AboutPage.styles';

function AboutPage() {
  return (
    <div className={containerStyles}>
      <section id="intro" className={introStyles}>
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

      <section id="contacts">
        <h2>Contacts</h2>
        <p>
          Follow us on Instagram:
          <Link
            aria-label="External link to Limba Vie Instagram page"
            href="https://instagram.com/limba_vie"
            rel="noopener external"
            target="_blank"
            prefetch={false}
          >
            <IconBrandInstagram className={instagramIconStyles} />
            limba_vie
          </Link>
        </p>
        <address className={addressStyles}>
          <p>
            Have any questions, suggestions, or need assistance?
            <br />
            Reach out to us at{' '}
            <Link
              aria-label="Contact e-mail address"
              href="mailto:limba@ravenplan.com"
            >
              limba@ravenplan.com
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

      <section id="credits" className={'styles.credits'}>
        <h2>Credits</h2>
        <p>
          We highly appreciate the creators of the open-source assets that
          helped us develop this app:
        </p>
        <ul className={creditsListStyles}>
          <li>
            <Link
              aria-label="External link to Tabler Icons website"
              href="https://tabler.io/icons"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              Tabler Icons
            </Link>
          </li>
          <li>
            <Link
              aria-label="External link to Freesound website"
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
              aria-label="External link to Freesound website"
              href="https://freesound.org/people/LittleRobotSoundFactory/"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              LittleRobotSoundFactory <IconExternalLink />
            </Link>{' '}
            | License:{' '}
            <Link
              aria-label="External link to Creative Commons license page"
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
              aria-label="External link to an image on Freepik.com"
              href="https://www.freepik.com/free-vector/cute-bull-thumbs-up-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_35868793.html"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              Image by catalyststuff <IconExternalLink />
            </Link>{' '}
            on Freepik
          </li>
          <li>
            Vectors and icons by{' '}
            <Link
              aria-label="External link to SVG Repo website"
              href="https://www.svgrepo.com"
              rel="noopener external"
              target="_blank"
              prefetch={false}
            >
              SVG Repo <IconExternalLink />
            </Link>{' '}
          </li>
        </ul>
      </section>

      <section id="legal">
        <h2>Legal</h2>
        <p>
          By using <b>Limba Vie</b> (the &quot;Application&quot;), you
          acknowledge that you have <em>read</em>, <em>understood</em>, and
          <em> agree</em> to be bound by our{' '}
          <Link aria-label="Terms of Use page" href="/about/legal/terms-of-use">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link
            aria-label="Privacy Policy page"
            href="/about/legal/privacy-policy"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>
      <section id="progress">
        <h2>Progress</h2>
        <ExportProgress />
        <hr className={hrStyles} />
        <ImportProgress />
        <hr className={hrStyles} />
        <DeleteAllData />
      </section>
    </div>
  );
}

export default AboutPage;
