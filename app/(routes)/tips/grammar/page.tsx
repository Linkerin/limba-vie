import type { Metadata } from 'next';

import GrammarView from '@/app/_components/_views/tips/grammar/GrammarView/GrammarView';

export const metadata: Metadata = {
  title: 'Grammar',
  description:
    'Explore detailed explanations of essential Romanian grammar concepts. Master the rules of articles, verb conjugations, noun cases, and more to enhance your Romanian language skills with Limba Vie.'
};

async function GrammarPage() {
  return <GrammarView />;
}

export default GrammarPage;
