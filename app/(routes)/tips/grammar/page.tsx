import type { Metadata } from 'next';

import TipsPage from '@/app/_components/_pages/TipsPage/TipsPage';

export const metadata: Metadata = {
  title: 'Grammar',
  description:
    'Explore detailed explanations of essential Romanian grammar concepts. Master the rules of articles, verb conjugations, noun cases, and more to enhance your Romanian language skills with Limba Vie.'
};

async function Tips() {
  return <TipsPage />;
}

export default Tips;
