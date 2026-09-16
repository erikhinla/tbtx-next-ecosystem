import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const businessHost = (request.headers.get('host') || '').includes('bizbuilders');
  const pages: Record<string, string> = {
    '/': businessHost ? 'bizbuilders.html' : 'index.html',
    '/tbtx': 'index.html', '/index.html': 'index.html',
    '/bbai': 'bizbuilders.html', '/bizbuilders.html': 'bizbuilders.html',
    '/story': 'story.html', '/story.html': 'story.html', '/about': 'story.html',
    '/hang': 'hang.html',
    '/hang.html': 'hang.html',
  };
  if (path === '/bbm' || path.startsWith('/bbm/')) {
    return NextResponse.redirect(new URL('/bizbuilders.html#build', request.url));
  }
  if (path.startsWith('/hang/')) {
    const slug = path.split('/').filter(Boolean)[1] || '';
    const url = new URL('/review/proof-momentum/story.html', request.url);
    if (slug && slug !== 'assets') url.searchParams.set('p', slug);
    return NextResponse.rewrite(url);
  }
  const page = pages[path];
  return page
    ? NextResponse.rewrite(new URL('/review/proof-momentum/' + page, request.url))
    : NextResponse.next();
}
export const config = {
  matcher: ['/', '/tbtx', '/index.html', '/bbai', '/bizbuilders.html', '/story', '/story.html', '/about', '/hang', '/hang.html', '/hang/:path*', '/bbm', '/bbm/:path*'],
};
