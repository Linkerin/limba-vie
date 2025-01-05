import type { Metadata } from 'next';

import GrammarView from '@/app/_components/_views/tips/grammar/GrammarView/GrammarView';
import { CANONICAL_URL } from '@/app/_lib/constants';

export const metadata: Metadata = {
  title: 'Grammar',
  description:
    'Explore detailed explanations of essential Romanian grammar concepts. Master the rules of articles, verb conjugations, noun cases, and more to enhance your Romanian language skills with Limba Vie.',
  alternates: {
    canonical: `${CANONICAL_URL}/tips/grammar`
  }
};

async function GrammarPage() {
  return <GrammarView />;
}

export default GrammarPage;
