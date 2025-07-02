import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const roleCookie = request.cookies.get('role');
  const userRole = roleCookie?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}
