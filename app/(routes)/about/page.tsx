import type { Metadata } from 'next';

import AboutPage from '@/app/_components/Pages/AboutPage/AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Limba Vie, the mobile app designed to help you learn Romanian vocabulary. Discover our contact information and the projects we appreciate.'
};

function About() {
  return <AboutPage />;
}

export default About;
