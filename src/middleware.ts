import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Only redirect from root — don't touch sub-routes or assets
  if (pathname !== '/') return NextResponse.next();

  if (hostname.includes('bizbuilders')) {
    return NextResponse.redirect(new URL('/bbai', request.url));
  }

  if (hostname.includes('bizbotmrktng') || hostname.includes('bizbot')) {
    return NextResponse.redirect(new URL('/bbm', request.url));
  }

  if (hostname.includes('transformby10x')) {
    return NextResponse.redirect(new URL('/tbtx', request.url));
  }

  // Default fallback — stay on ecosystem index
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
