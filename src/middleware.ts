import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const signInURL = new URL('/login', request.url);
  const loginURL = new URL('/users', request.url);

  if (token) {
    if (request.nextUrl.pathname === '/users') {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginURL);
  }

  if (!token) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInURL);
  }
}

export const config = {
  matcher: ['/', '/login/:path*', '/users/:path*'],
};
