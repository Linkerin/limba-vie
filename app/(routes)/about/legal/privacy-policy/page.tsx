import type { Metadata } from 'next';

import PrivacyPolicyView from '@/app/_components/_views/about/legal/privacy-policy/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of Limba Vie application',
  keywords: 'legal, information, privacy, policy'
};

function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}

export default PrivacyPolicyPage;
