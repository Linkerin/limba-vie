import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const data = userAgent(request);
  const userId = request.cookies.get('x-user-id');

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: '/:path*'
};
