import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL: Record<string, string> = {
  '/bizbuilders.html': '/bbai',
  '/bizbuilders': '/bbai',
  '/tbtx/bbai': '/bbai',
  '/proof': '/bbai#proof',
  '/proof.html': '/bbai#proof',
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  const dest = CANONICAL[path];
  if (dest) {
    const url = new URL(dest, request.url);
    return NextResponse.redirect(url, 301);
  }

  const businessHost = (request.headers.get('host') || '').includes('bizbuilders');
  const pages: Record<string, string> = {
    '/': businessHost ? 'bizbuilders.html' : 'index.html',
    '/tbtx': 'index.html',
    '/index.html': 'index.html',
    '/scan': 'index.html',
    '/daily': 'index.html',
    '/bbai': 'bizbuilders.html',
    '/map': 'bizbuilders.html',
    '/trace.html': 'bizbuilders.html',
    '/story': 'story.html',
    '/story.html': 'story.html',
    '/about': 'story.html',
    '/hang': 'hang.html',
    '/hang.html': 'hang.html',
  };
  if (path === '/bbm' || path.startsWith('/bbm/')) {
    return NextResponse.redirect(new URL('/bbai', request.url), 301);
  }
  if (path === '/bbai/map' || path.startsWith('/bbai/map')) {
    return NextResponse.rewrite(new URL('/review/proof-momentum/bizbuilders.html', request.url));
  }
  if (path === '/bbai/blueprint' || path.startsWith('/bbai/blueprint')) {
    return NextResponse.rewrite(new URL('/review/proof-momentum/bizbuilders.html', request.url));
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
  matcher: [
    '/',
    '/tbtx',
    '/tbtx/bbai',
    '/index.html',
    '/scan',
    '/daily',
    '/map',
    '/proof',
    '/proof.html',
    '/trace.html',
    '/bbai',
    '/bbai/:path*',
    '/bizbuilders',
    '/bizbuilders.html',
    '/story',
    '/story.html',
    '/about',
    '/hang',
    '/hang.html',
    '/hang/:path*',
    '/bbm',
    '/bbm/:path*',
  ],
};
