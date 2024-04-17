import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    request.url.includes('netlify.app') &&
    process.env.NETLIFY_REDIRECT === 'TRUE'
  ) {
    return NextResponse.redirect(new URL('/', 'https://limba.vercel.app'));
  }
}

export const config = {
  matcher: '/:path*'
};
