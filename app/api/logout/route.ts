// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const homeUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = NextResponse.redirect(new URL('/', homeUrl));

  // Clear the session cookie
  response.cookies.set('session', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
