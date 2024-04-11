import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

import styles from './page.module.css';

function AboutPage() {
  return (
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
  );
}

export default AboutPage;
