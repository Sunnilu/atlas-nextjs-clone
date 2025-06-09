// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Hardcoded login credentials (for demo purposes)
  if (email === 'user@atlasmail.com' && password === '123456') {
    const response = NextResponse.json({ success: true });

    response.cookies.set('session', 'valid', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
