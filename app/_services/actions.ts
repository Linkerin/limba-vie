'use server';

import { headers, cookies } from 'next/headers';

export async function getUserInfoFromReq() {
  const cookiesStore = cookies();
  const headersList = headers();

  const ip = headersList.get('X-Forwarded-For');
  const userAgent = headersList.get('user-agent');
  const userId = cookiesStore.get('x-user-id')?.value;

  return { ip, userAgent, userId };
}
