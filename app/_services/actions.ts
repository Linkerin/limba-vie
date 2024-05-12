'use server';

import { cookies } from 'next/headers';

export async function setUserCookie(userId: string) {
  const week = 7 * 24 * 60 * 60 * 1000;

  cookies().set('x-user-id', userId, {
    expires: Date.now() + week,
    httpOnly: true
  });
}
