import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('accessToken')?.value
  // const roleCookie = request.cookies.get('role')
  // console.log(token,"----------")
  // const userRole = roleCookie?.value;
  const userRole = 'admin'

  if (request.nextUrl.pathname.startsWith('/dashboard') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}
