import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  if (request.nextUrl.origin !== process.env.NEXT_PUBLIC_BASE_URL) {
    const res = new Response(null, { status: 400 });
    return res;
  }

  const data = await request.json();
  const userId = data.userId;

  if (!userId) {
    const res = new Response('Invalid query', { status: 400 });
    return res;
  }

  const week = 7 * 24 * 60 * 60 * 1000;

  cookies().set('x-user-id', userId, {
    expires: Date.now() + week,
    httpOnly: true,
    path: '/'
  });

  const response = new Response('OK');

  return response;
}
