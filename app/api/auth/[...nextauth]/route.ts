// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { NextRequest, NextResponse } from 'next/server';

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      } else {
        session.user.id = ''; // fallback to prevent type error
      }
      return session;
    },
  },
});

// ✅ Required export for Next.js App Router
const { auth, handlers } = handler;
export { auth };
export const { GET, POST } = handlers;
export const runtime = 'edge'; // optional but recommended for NextAuth v5

