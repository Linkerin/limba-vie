import type { Metadata } from 'next';

import AboutPage from '@/app/_components/Pages/AboutPage/AboutPage';

export const metadata: Metadata = {
  title: 'About'
};

function About() {
  return <AboutPage />;
}

export default About;
