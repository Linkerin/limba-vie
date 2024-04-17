import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    request.url.includes('netlify') &&
    process.env.NETLIFY_REDIRECT === 'TRUE'
  ) {
    return Response.redirect(new URL('/', 'https://limba.vercel.app'));
  }
}

export const config = {
  matcher: '/:path*'
};
