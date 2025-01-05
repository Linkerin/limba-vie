import type { Metadata } from 'next';

import { CANONICAL_URL } from '@/app/_lib/constants';
import TermsOfUseView from '@/app/_components/_views/about/legal/terms-of-use/TermsOfUseView';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'See our Terms of Use and how they relate to you.',
  keywords: 'legal, information, terms, service, use',
  alternates: {
    canonical: `${CANONICAL_URL}/about/legal/terms-of-use`
  }
};

function TermsOfUsePage() {
  return <TermsOfUseView />;
}

export default TermsOfUsePage;
