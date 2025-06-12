// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure session.user exists and assign token.sub to id
      if (session.user && typeof token.sub === 'string') {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

// Export for Next.js App Router
export const { handlers, auth } = handler;
export const { GET, POST } = handlers;
export const runtime = 'edge';
