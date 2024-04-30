import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { device } = userAgent(request);

  requestHeaders.set('x-device-type', device?.type ?? '');
  requestHeaders.set('x-device-model', device?.model ?? '');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  return response;
}

export const config = {
  matcher: '/:path*'
};
