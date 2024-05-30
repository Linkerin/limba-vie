import type { Metadata } from 'next';

import PrivacyPolicyPage from '@/app/_components/Pages/AboutPage/Legal/PrivacyPolicyPage/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of Limba Vie application',
  keywords: 'legal, information, privacy, policy'
};

function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}

export default PrivacyPolicy;
