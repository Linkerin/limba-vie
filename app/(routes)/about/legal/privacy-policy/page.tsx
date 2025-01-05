import type { Metadata } from 'next';

import { CANONICAL_URL } from '@/app/_lib/constants';
import PrivacyPolicyView from '@/app/_components/_views/about/legal/privacy-policy/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of Limba Vie application',
  keywords: 'legal, information, privacy, policy',
  alternates: {
    canonical: `${CANONICAL_URL}/about/legal/privacy-policy`
  }
};

function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}

export default PrivacyPolicyPage;
