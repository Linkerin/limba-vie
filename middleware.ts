// import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    request.url.includes('localhost') &&
    process.env.NETLIFY_REDIRECT === 'TRUE'
  ) {
    return Response.redirect(new URL('/', 'https://limba.vercel.app'));
    // return NextResponse.redirect(new URL('/', 'https://limba.vercel.app'));
  }
}

export const config = {
  matcher: '/:path*'
};
