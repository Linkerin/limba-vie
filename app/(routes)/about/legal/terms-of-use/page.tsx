import type { Metadata } from 'next';

import TermsOfUsePage from '@/app/_components/_pages/AboutPage/Legal/TermsOfUse/TermsOfUsePage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'See our Terms of Use and how they relate to you.',
  keywords: 'legal, information, terms, service, use'
};

function TermsOfUse() {
  return <TermsOfUsePage />;
}

export default TermsOfUse;
