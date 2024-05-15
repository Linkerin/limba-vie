'use server';

import { headers, cookies } from 'next/headers';

export async function getUserInfoFromReq() {
  const cookiesStore = cookies();
  const headersList = headers();

  const ip = headersList.get('X-Forwarded-For');
  const userAgent = headersList.get('user-agent');
  const userId = cookiesStore.get('x-user-id')?.value;

  const city = headersList.get('x-vercel-ip-city');
  const country = headersList.get('x-vercel-ip-country');

  return { country, city, ip, userAgent, userId };
}
