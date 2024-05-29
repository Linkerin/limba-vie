import type { Metadata } from 'next';

import TermsOfUsePage from '@/app/_components/Pages/AboutPage/Legal/TermsOfUse/TermsOfUsePage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'See our Terms of Use and how they relate to you.'
};

function TermsOfUse() {
  return <TermsOfUsePage />;
}

export default TermsOfUse;
