import type { Metadata } from 'next';

import AboutPage from '@/app/_components/_views/about/AboutPage';
import { CANONICAL_URL } from '@/app/_lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Limba Vie, the mobile app designed to help you learn Romanian vocabulary. Discover our contact information and the projects we appreciate.',
  alternates: {
    canonical: `${CANONICAL_URL}/about`
  }
};

function About() {
  return <AboutPage />;
}

export default About;
