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
      // Safely assign token.sub to session.user.id if it exists
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      } else if (session.user) {
        session.user.id = ''; // Fallback to satisfy type checker
      }
      return session;
    },
  },
});

// Extract and export auth helpers for App Router
export const { handlers, auth } = handler;
export const { GET, POST } = handlers;
export const runtime = 'edge'; // Optional but recommended for performance
